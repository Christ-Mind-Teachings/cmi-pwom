#!/usr/bin/env node

/*
 * Reads project.json found in ../standalone/config/. 
 *
 * Outputs project specific info to src/js/modules/_config/si.js. This
 * is imported by key.js and used to generate a key for each page. Keys
 * are used in search and bookmarks.
 *
 * Run this when moving from standalone to integration environment.
 */
var fs = require('fs');

const args = process.argv.slice(2);
const sourceInfo = "../src/js/modules/_config/si.js";

if (args.length < 1) {
  console.log("Enter path to config files.");
  process.exit();
}

let inPath = args[0];
let project = `${inPath}/project.json`;

function readFile(fn) {
  try {
    let config = fs.readFileSync(fn, 'utf8');
    return JSON.parse(config);
  }
  catch(e) {
    console.error("Can't read file: %s", fn);
    process.exit(1);
  }
}

function splitUrl(url) {
  let u = url;

  //remove leading "/"
  u = url.substr(1);

  //remove trailing '/' if it exists
  if (u[u.length-1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function buildArray(cfg, array, level2 = false) {
  if (array.length === 0) {
    array.push("xxx");
  }
  for (let i=0; i < cfg.contents.length; i++) {
    if (cfg.contents[i].url) {
      let parts = splitUrl(cfg.contents[i].url);
      if (level2) {
        array.push(`/${parts[parts.length -1]}`);
      }
      else {
        array.push(parts[parts.length -1]);
      }
    }
    if (cfg.contents[i].contents) {
      buildArray(cfg.contents[i], array, true);
    }
  }
}

let projectInfo = readFile(project);
let contents = [];

//read json files
for (let i=0; i < projectInfo.books.length; i++) {
  contents[i] = readFile(`${inPath}/${projectInfo.books[i]}.json`);
}

//const output = fs.createWriteStream(`${outPath}/projectInfo.js`);
const output = fs.createWriteStream(`${sourceInfo}`);

//output.write("export const si = {\n");
output.write("module.exports = {\n");

output.write(`  sourceId: ${projectInfo.sourceId},\n`);
output.write(`  sid: "${projectInfo.sid}",\n`);
output.write(`  prefix: "/t/${projectInfo.sid}",\n`);
output.write(`  books: ${JSON.stringify(projectInfo.books)},\n`);

let bookIds = ["xxx", ...projectInfo.books];

output.write(`  bookIds: ${JSON.stringify(bookIds)},\n`);

output.write("\n  contents: {\n");
for (let i=0; i < contents.length; i++) {
  let array = [];
  buildArray(contents[i], array);
  let unitArray = array.filter(el => {
    return el[0] !== "/";
  });
  let subUnitArray = array.filter(el => {
    return el[0] === "/";
  });
  output.write(`    ${contents[i].bid}: ${JSON.stringify(unitArray)},\n`);
  if (subUnitArray.length > 0) {
    subUnitArray.unshift("xxx");
    //write unique values only
    output.write(`    ${contents[i].bid}2: ${JSON.stringify([...new Set(subUnitArray)])},\n`);
  }
}
output.write("  }\n");
output.write("};\n");
output.end();


