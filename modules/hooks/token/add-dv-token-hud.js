import HudInterface from "../../hud/interface.js";

const AddDvTokenHud = () => {
  /**
   * Add DV icon to token HUD to allow easy selection of DV table entries
   *
   * @public
   * @memberof hookEvents
   * @param {Document} hud - Instance of the token HUD provided by Foundry
   * @param {object} html  - HTML DOM object
   * @param {string} token - token data
   */
  Hooks.on("renderTokenHUD", async (hud, html, token) => {
    // Foundry v13+ passes an HTMLElement and the render context instead of jQuery and token data.
    const $html = $(html);
    const tokenData = hud.document?.toObject() ?? token;
    const render =
      foundry.applications?.handlebars?.renderTemplate ?? renderTemplate;
    const dvHudTemplate = `systems/${game.system.id}/templates/hud/dv.hbs`;
    const dvDisplay = await render(dvHudTemplate, tokenData.flags);
    $html.find("div.left").append(dvDisplay);
    $html.find(".dv-table-selector").click(() => {
      HudInterface.SetDvTable(tokenData);
      hud.clear();
    });
  });
};

export default AddDvTokenHud;
