#!/usr/bin/env node

var fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Enter path to config files and path to output directory.");
  process.exit();
}

let inPath = args[0];
let outPath = args[1];
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

function buildArray(cfg, array) {
  for (let i=0; i < cfg.contents.length; i++) {
    if (cfg.contents[i].url) {
      array.push(cfg.contents[i].url);
    }
    if (cfg.contents[i].contents) {
      buildArray(cfg.contents[i], array);
    }
  }
}

let projectInfo = readFile(project);
console.log("projectInfo: %o", projectInfo);

let contents = [];

for (let i=0; i < projectInfo.books.length; i++) {
  contents[i] = readFile(`${inPath}/${projectInfo.books[i]}.json`);
}

console.log("contents: %o", contents);

const output = fs.createWriteStream(`${outPath}/projectInfo.js`);

output.write(`const sourceId = ${projectInfo.sourceId};\n`);
output.write(`const sid = ${projectInfo.sid};\n`);
output.write(`const prefix = /t/${projectInfo.sid};\n`);
output.write(`const books = ${JSON.stringify(projectInfo.books)};\n`);
output.write(`const bookIds = ["xxx", ...books];\n`);

for (let i=0; i < contents.length; i++) {
  let array = [];
  buildArray(contents[i], array);
  output.write(`const ${contents[i].bid} = ${JSON.stringify(array)};\n`);
}
output.end();



