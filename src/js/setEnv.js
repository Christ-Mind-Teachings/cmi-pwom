/*
 * Set standalone or integrated environment.
 *
 * Standalone runs from the _site directory of a Jekyll
 * install and Integrated runs from ../cmi-www/_site/t/???
 */
import constants from "./constants";
import {setEnv} from "./modules/_config/config";

export function setRuntimeEnv() {
  setEnv(constants);
  return constants.env;
}

