/**
 * Build the DV text for a measured distance, using the DV table set on the controlled token
 * (or the only owned character/mook token).
 *
 * @param {Number} distance - the measured distance
 * @returns {String} - the DV text, or an empty string if there is no DV for this distance
 */
function getDvLabel(distance) {
  let token = canvas.tokens.controlled["0"];
  if (!token) {
    const ownedTokens = canvas.tokens.ownedTokens.filter(
      (t) =>
        t.actor.constructor.name === "CPRCharacterActor" ||
        t.actor.constructor.name === "CPRMookActor"
    );
    token = ownedTokens.length === 1 ? ownedTokens[0] : false;
  }
  if (!token) {
    const noToken = game.i18n.localize("CPR.messages.warningRulerNoToken");
    return `DV: ${noToken}`;
  }
  const DvTable = token.document.getFlag(game.system.id, "cprDvTable");
  if (!DvTable || typeof DvTable !== "object") return "";
  const displayTable = DvTable.name.replace(/^DV /, "");
  const table = foundry.utils.duplicate(DvTable.table);
  if (typeof table !== "object" || Object.keys(table).length === 0) return "";
  let DV = 0;
  for (const range of Object.keys(table)) {
    const [start, end] = range.split("_");
    if (
      parseInt(distance, 10) >= parseInt(start, 10) &&
      parseInt(distance, 10) <= parseInt(end, 10)
    ) {
      DV = table[range];
    }
  }
  return DV > 0 ? `DV: ${DV} ${displayTable}` : "";
}

export default function overrideRulerFunctions() {
  // Foundry v13+ rewrote the Ruler: labels come from _getWaypointLabelContext and a template.
  const BaseRuler = CONFIG.Canvas.rulerClass;
  class CPRRuler extends BaseRuler {
    static WAYPOINT_LABEL_TEMPLATE = `systems/${game.system.id}/templates/hud/waypoint-label.hbs`;

    _getWaypointLabelContext(waypoint, state) {
      const context = super._getWaypointLabelContext(waypoint, state);
      if (context && this.user.isSelf) {
        context.cprDv = getDvLabel(waypoint.measurement.distance);
      }
      return context;
    }
  }
  CONFIG.Canvas.rulerClass = CPRRuler;
}

const foundryValidate = foundry.abstract.DataModel.prototype.validate;
/**
 * Override for the validate function of Foundry's DataModel.
 * If migration is running, always return true.
 * Otherwise, call the original validate function.
 * @param {object} options
 * @returns {boolean} - The result of the validation.
 */
export function validateOverride(options) {
  if (game.cpr.MigrationRunner.needsMigration) return true;
  return foundryValidate.call(this, options);
}
