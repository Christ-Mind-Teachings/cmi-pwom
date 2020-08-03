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
  sourceId: 16,
  quoteManagerId: "3f7f14c0d7a13eb2e5a05f3c981f33fb",
  quoteManagerName: "CMI",
  env: env,                      //sa or prod, sa=standalone
  lang: lang,
  sid: sid,
  title: title,
  audioBase: `https://s3.amazonaws.com/${bucket}/${sid}/audio`,
  searchEndpoint: `https://d9lsdwxpfg.execute-api.us-east-1.amazonaws.com/latest/${sid}`,
  bm_modal_key: `bm.${sid}.modal`,         //list
  bm_creation_state: `bm.${sid}.creation`, //bookmark
  bm_list_store: `bm.${sid}.list`,         //bmnet
  bm_topic_list: `bm.${sid}.topics`,       //bmnet
  bm_modal_store: `bm.${sid}.modal`,       //navigator
  configStore: `config.${sid}.`,
  url_prefix: `/t/${sid}`,                  //navigator
  getPageInfo: getPageInfo,              //list
  keyInfo: keyInfo                      //list, bmnet
};
