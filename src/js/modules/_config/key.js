/*
  Transcript keys
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.
  - first item starts with 1

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit
        ppp: paragraph number - not positional

  Limits:
    The Library of Christ Mind Teachings is limited to
       99 Sources
       99 Books per source
      999 Units (chapters) per book
       99 Unique Subunits per book
      999 Paragraphs per unit or subunit

  Example: url's
      [/t/sourceId]/bookId/unitId/subunitId/
      - /t/sourceId is omitted in standalone mode

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/

const si = require("./si");
const sprintf = require("sprintf-js").sprintf;
const keyLength = 9; //length of pageKey excluding decimal portion

/*
 * The argument is the page url. Use the book id (bid)
 * to find the position of the page in the contents array.
 */
function getUnitId(...urlArray) {
  let bid = getBook(urlArray);
  let {unit, subunit} = getUnitInfo(urlArray);

  if (si.contents[bid]) {
    return si.contents[bid].indexOf(unit);
  }
  throw new Error(`unexpected bookId: ${bid}`);
}

/*
 * Get the position of the subunit from the bid2 array.
 * Return -1 if not found,
 *         0 if there is no subunit
 */
function getSubunitId(...urlArray) {
  let bid = getBook(urlArray);
  let {unit, subunit} = getUnitInfo(urlArray);
  let level2 = `${bid}2`;

  if (!subunit) {
    return 0;
  }

  if (si.contents[level2]) {
    return si.contents[level2].indexOf(`/${subunit}`);
  }
  throw new Error(`unexpected bookId: ${level2}`);
}

/*
 * The url will be either:
 * Integration: /t/pid/bid/uid/[xid/] or
 * Standalone:  /bid/uid/[xid/]
 *
 * Return object containing unit and subunit from url
 */
function getUnitInfo(urlArray) {
  //set values for integration
  let uidPos = 3;
  let subunit;

  if (urlArray[0] !== "t") {
    uidPos = 1;
  }

  //check for subunit in url
  if (urlArray.length === uidPos + 2) {
    subunit = urlArray[uidPos + 1];
  }

  return {unit: urlArray[uidPos], subunit: subunit};
}

/*
 * Return the number of chapters in the book (bid).
 * Subtract one from length because of 'xxx' (fake chapter)
*/
function getNumberOfUnits(bid) {
  if (si.contents[bid]) {
    return si.contents[bid].length - 1;
  }
  throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
}

/*
 * Split url into an array. Strip leading and trailing
 * '/' characters first so we don't get empty elements
 * in the array.
 */
function splitUrl(url) {
  let u = url;

  //remove leading
  u = url.substr(1);

  //remove trailing '/' if it exists
  if (u[u.length-1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return si.sourceId;
}

function getKeyInfo() {
  return {
    sourceId: si.sourceId,
    keyLength: keyLength
  };
}

/*
 * Parse key into page part and paragraph part. The two are
 * still part of the key.
 *
 * - a paraKey = 0 represent no paraKey in argument.
 */
function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let paraKey = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf(".");

  //if no decimal key doesn't include paragraph id
  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1);

    //append 0's if decimal part < 3
    switch(decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;
      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }
    paraKey = parseInt(decimalPart, 10);
  }
  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);

  //console.log("parseKey: %o", {paraKey, pageKey});
  return {paraKey, pageKey};
}

/*
 * Get bid (book id) from url.
 *
 * We could be running in standalone or integration mode. Integration
 * mode is indicated by urlArray[0] == 't'
 *
 * The url is in this format: [t/sid]/bid/uid/suid, where [t/sid]
 * are present only in integration mode
 */
function getBook(urlArray) {
  if (urlArray[0] === "t") {
    return urlArray[2];
  }
  return urlArray[0];
}

/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/
function genPageKey(url = location.pathname) {
  let key = {
    sid: si.sourceId,
    bid: 0,
    uid: 0,
    xid: 0
  };

  let parts = splitUrl(url);

  //make sure we have a valid book
  key.bid = si.bookIds.indexOf(getBook(parts));
  if (key.bid === -1) {
    return -1;
  }

  //get the unitId of the page, return if invalid
  key.uid = getUnitId(...parts);
  if (key.uid === -1) {
    return -1;
  }

  //get the subunitId
  key.xid = getSubunitId(...parts);
  if (key.xid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s%02s", key.sid, key.bid, key.uid, key.xid);
  let numericKey = parseInt(compositeKey, 10);

  return numericKey;
}

/*
 * genParagraphKey(paragraphId, key: url || pageKey)
 *
 * args:
 *   pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
 *        - it's converted to number and incremented by 1 then divided by 1000
 *       pid can also be a number so then we just increment it and divide by 1000
 *
 *   key: either a url or pageKey returned from genPageKey(), if key
 *   is a string it is assumed to be a url
 */
function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  }
  else {
    pKey = (pid + 1)/1000;
  }

  //if key is a string it represents a url
  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;

  return paragraphKey;
}

/*
  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/
function decodeKey(key) {
  let {pid, pageKey} = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    key: key,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    xid: 0,
    pid: pid ? pid - 1: -1
  };

  //error, invalid key length
  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  //check for valid sourceId
  decodedKey.sid = parseInt(pageKeyString.substr(0,2), 10);
  if (decodedKey.sid !== si.sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${si.sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2,2), 10);
  decodedKey.bookId = si.bookIds[bid];

  decodedKey.uid = parseInt(pageKeyString.substr(4,3), 10);
  decodedKey.xid = parseInt(pageKeyString.substr(7,2), 10);

  //search is off by 1, so decrement keys, watch for side effects
  //decodedKey.uid = decodedKey.uid - 1;
  //decodedKey.xid = decodedKey.xid - 1;

  //console.log("decodedKey: %o", decodedKey);
  return decodedKey;
}

/*
 * Convert page key to url
 */
function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit;
  let subunit;
  let url = "/invalid/key/";

  if (decodedKey.error) {
    return url;
  }

  if (si.contents[decodedKey.bookId]) {
    unit = si.contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.xid > 0) {
      subunit = si.contents[`${decodedKey.bookId}2`][decodedKey.xid];
      url = `/${decodedKey.bookId}/${unit}${subunit}/`;
    }
    else {
      url = `/${decodedKey.bookId}/${unit}/`;
    }

    if (withPrefix) {
      return `${si.prefix}${url}`;
    }
  }

  return url;
}

function getBooks() {
  return si.books;
}

/*
  Describe key in terms of source:book:unit:p
*/
function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {key: key, error: true, source: si.sid};
  }

  let info = {
    key: key,
    source: si.sid,
    book: decodedKey.bookId,
    unit: si.contents[decodedKey.bookId][decodedKey.uid],
    subunit: si.contents[`${decodedKey.bookId}2`][decodedKey.xid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  //console.log("describeKey: %o", info);
  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

