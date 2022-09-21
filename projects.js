import coffee_static from "/public/projects/coffee_static.png";
import coffee_thumb from "/public/projects/coffee_thumb.gif";
import gm_static from "/public/projects/gm_static.png";
import gm_thumb from "/public/projects/gm_thumb.gif";
import boba_static from "/public/projects/boba_static.png";
import boba_thumb from "/public/projects/boba_thumb.gif";
import cardio_static from "/public/projects/cardio_static.png";
import cardio_thumb from "/public/projects/cardio_thumb.gif";
import ashes_thumb from "/public/projects/ashes_thumb.gif";
import ashes_static from "/public/projects/ashes_static.png";
import slice_thumb from "/public/projects/slice_thumb.gif";
import slice_static from "/public/projects/slice_static.png";
import kitty_thumb from "/public/projects/kitty_thumb.gif";
import kitty_static from "/public/projects/kitty_static.png";
import spacebar_thumb from "/public/projects/spacebar_thumb.gif";
import spacebar_static from "/public/projects/spacebar_static.png";
import art_thumb from "/public/projects/art_thumb.gif";
import art_static from "/public/projects/art_static.jpg";
import ezcv_static from "/public/projects/ezcv_static.png";
import ezcv_thumb from "/public/projects/ezcv_thumb.gif";

export const tags = {
  GAME: "game",
  WEB: "web",
  ART: "art",
  ANIMATION: "animation",
}

export const tools = {
  REACT: "react",
  AIRTABLE: "airtable",
  REDUX: "redux",
  UNITY: "unity & c#",
  PTS: "paint tool sai",
  HTMLCSS: "html/css",
  JS: "javascript",
  REAPER: "reaper",
  FIGMA: "figma",
}

export const getProject = (name) => {
  return projects[name];
}

const projects = {
  ezcv: {
    name: "ezcv",
    description: "a plaintext-to-resume generator",
    thumb: ezcv_thumb,
    static: ezcv_static,
    date: "sep 2022",
    tags: [tags.WEB],
    tools: [tools.HTMLCSS, tools.JS, tools.REACT, tools.FIGMA],
    link: "https://ezcv.pro/",
  },
  boba: {
    name: "BOBA",
    description: "mobile puzzle game about drinking boba",
    thumb: boba_thumb,
    static: boba_static,
    date: "aug 2020",
    tags: [tags.GAME, tags.ART],
    tools: [tools.UNITY, tools.PTS],
    link: "https://cnnmon.itch.io/boba",
  },
  coffee: {
    name: "coffeelings",
    description: "mood tracker & journaling chrome extension",
    thumb: coffee_thumb,
    static: coffee_static,
    date: "march 2020",
    tags: [tags.WEB, tags.ART],
    tools: [tools.HTMLCSS, tools.JS, tools.PTS],
    link: "https://chrome.google.com/webstore/detail/coffeelings/hcbddpppkcnfjifbcfnhmelpemdoepkk/",
  },
  cardio: {
    name: "CardioCasino",
    description: "slots simulator about childhood & cardiovascular risk",
    thumb: cardio_thumb,
    static: cardio_static,
    date: "oct 2019",
    tags: [tags.GAME, tags.ART],
    tools: [tools.UNITY, tools.PTS, tools.REAPER],
    link: "https://cnnmon.itch.io/cardiocasino",
  },
  ashes: {
    name: "LD45, Ashes to Ash",
    description: "72-hour platformer eabout collecting emotions",
    thumb: ashes_thumb,
    static: ashes_static,
    date: "oct 2019",
    tags: [tags.GAME, tags.ART, tags.ANIMATION],
    tools: [tools.UNITY, tools.PTS],
    link: "https://ldjam.com/events/ludum-dare/45/ashes-to-ash/",
  },
  slice: {
    name: "LD44, Slice of Scythe",
    description: "72-hour point-and-click game about grim reapers and hats",
    thumb: slice_thumb,
    static: slice_static,
    date: "apr 2019",
    tags: [tags.GAME, tags.ART],
    tools: [tools.UNITY, tools.PTS],
    link: "https://cnnmon.itch.io/slice-of-scythe",
  },
  gm: {
    name: "good morning!",
    description: "morning routine simulator",
    thumb: gm_thumb,
    static: gm_static,
    date: "jan 2019",
    tags: [tags.GAME, tags.ART, tags.ANIMATION],
    tools: [tools.UNITY, tools.PTS],
    link: "https://cnnmon.itch.io/goodmorning",
  },
  art: {
    name: "AP Art, introspection",
    description: "digital illustration sustained investigation",
    thumb: art_thumb,
    static: art_static,
    date: "sep 2019 - may 2020",
    tags: [tags.ART],
    tools: [tools.PTS],
    link: "https://www.behance.net/gallery/121922563/introspection",
  },
  kitty: {
    name: "KittyClinic",
    description: "cat clinic simulator about the effects of holistic treatment",
    thumb: kitty_thumb,
    static: kitty_static,
    date: "nov 2018",
    tags: [tags.GAME, tags.ART],
    tools: [tools.UNITY, tools.PTS],
    link: "https://cnnmon.itch.io/kittyclinic",
  },
  spacebar: {
    name: "Spacebar",
    description: "space-based endless runner and typing game",
    thumb: spacebar_thumb,
    static: spacebar_static,
    date: "sep 2018",
    tags: [tags.GAME, tags.ART, tags.ANIMATION],
    tools: [tools.UNITY, tools.PTS],
    link: "https://cnnmon.itch.io/spacebar",
  },
}

export default projects;