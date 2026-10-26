# Cyberpunk RED — CORE v0.92.4 para Foundry v14 (não oficial)

Adaptação do sistema oficial [Cyberpunk RED Core](https://gitlab.com/cyberpunk-red-team/fvtt-cyberpunk-red-core) v0.92.4, que só suporta o Foundry v12, para rodar no **Foundry v14**. Testado no build 367 com um mundo de campanha real migrado do v12. As mudanças estão em `alteracoes-v14.patch` (15 arquivos).

```
O que foi corrigido
- system.json: compatibilidade 12 a 14.
- main.css: as abas inativas da barra lateral apareciam todas empilhadas.
- Criar item / contêiner / demon / Black ICE / mook pelo botão "Criar": o diálogo
  ficava preso e a ficha não abria.
- Editor de Efeitos Ativos do sistema (categorias, perícias, situacional, "ligado
  por padrão"): no v14 caía no editor padrão do Foundry.
- Ícone de tabela de DV no HUD do token.
- Régua de DV (mostra a DV ao medir distância com a régua).
- Árvore de itens instalados na aba Itens.
- Animação de pausa do sistema.
-
```

## Instalação

1. **Backup** da pasta do mundo (`Data/worlds/<nome-do-mundo>`). Abrir um mundo do v12 no v14 migra os dados e **não tem volta**.
2. Se já tiver o sistema oficial instalado, desinstale (*Sistemas de Jogo*), porque esta versão usa o mesmo id.
3. *Sistemas de Jogo → Instalar Sistema*, cole o link abaixo em **URL do Manifesto** e clique em Instalar:

```
https://github.com/LucasTerrau/cyberpunk-red-core-v14/releases/latest/download/system.json
```

Imagens enviadas para dentro da pasta do sistema somem quando ele é reinstalado. Guarde imagens em outra pasta (ex.: `Data/imagens`).

```
Limites
- Não atualize o sistema pelo Foundry: a atualização oficial v0.92.4 desfaz estas
  correções. Quando sair a versão oficial para v13/v14 (planejada como 0.94), use ela.
- Os módulos diwako-cpred-additions, token-action-hud-cyberpunk-red,
  cyberpunkred-importer e cpr-source-links continuam só para v12.
- Ainda usa APIs que o Foundry remove no v15 (cartões do chat, fichas V1).
  Serve para o v14, não para o v15.
```

## Licença e créditos

Sistema original do Cyberpunk RED Team, licença **GPL v3** (arquivo `LICENSE`); esta adaptação segue a mesma licença. Cyberpunk RED é marca da R. Talsorian Games; o conteúdo do jogo vem do sistema oficial, distribuído pela política de conteúdo de fãs da R. Talsorian. Projeto de fã, sem vínculo com a R. Talsorian nem com o Cyberpunk RED Team. Quando sair a versão oficial para v13/v14, prefira ela.
