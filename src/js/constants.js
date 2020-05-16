/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

let env = "standalone";
let sid = "pwom";
let title = "Droga Mistrzostwa";
let bucket = "assets.christmind.info";

export default {
  env: env,                      //sa or prod, sa=standalone
  sid: sid,
  title: title,
  audioBase: `https://s3.amazonaws.com/${bucket}/${sid}/audio`,
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
