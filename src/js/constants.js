/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

let env = "integration";
let sid = "pwom";
let lang = "pl";
let title = "Droga Mistrzostwa";
let bucket = "assets.christmind.info";

export default {
  env: env,
  lang: lang,
  sid: sid,
  title: title,
  url_prefix: `/t/${sid}`,                  //navigator
  getPageInfo: getPageInfo,              //list
  keyInfo: keyInfo,
  sourceId: 16,
  quoteManagerId: "3f7f14c0d7a13eb2e5a05f3c981f33fb",
  quoteManagerName: "CMI",
  audioBase: `https://s3.amazonaws.com/${bucket}/${sid}/audio`,
  searchEndpoint: `https://d9lsdwxpfg.execute-api.us-east-1.amazonaws.com/latest/${sid}`,
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
    cfgearly: "cfg.early"
  }
};
