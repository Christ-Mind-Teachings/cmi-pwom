/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getReservation, getAudioInfo, getPageInfo} from "./modules/_config/config";
import {pwomHelp} from "./modules/_extension/help";

const env = "integration";
const sid = "pwom";
const lang = "pl";
const title = "Droga Mistrzostwa";
const bucket = "assets.christmind.info";
const HOME_URI = `/t/${sid}`;

export default {
  env: env,
  lang: lang,
  sid: sid,
  title: title,
  url_prefix: HOME_URI,
  configUrl: `${HOME_URI}/public/config`,
  sourceId: 16,
  quoteManagerId: "3f7f14c0d7a13eb2e5a05f3c981f33fb",
  quoteManagerName: "CMI",
  getPageInfo: getPageInfo,
  keyInfo: keyInfo,
  audio: {
    audioBase: `https://s3.amazonaws.com/${bucket}/${sid}/audio`,
    timingBase: `${HOME_URI}/public/timing`,
    getReservation: getReservation,
    getAudioInfo: getAudioInfo
  },
  extension: {
    help: pwomHelp
  },
  store: {
    bmList: "bm.list",
    bmCreation: "bm.creation",
    bmTopics: "bm.topics",
    bmModal: "bm.modal",
    srchResults: "srch.results",
    pnDisplay: "pn.display",
    cfgacq: "cfg.acq",
    cfgwoh: "cfg.woh",
    cfgwot: "cfg.wot",
    cfgwok: "cfg.wok",
    cfgwos: "cfg.wos",
    cfglj: "cfg.lj",
    cfgearly: "cfg.early",
    cfgearly2: "cfg.early2"
  }
};
