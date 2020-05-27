const key = require("./key");

test("source Id equals 16", () => {
  expect(key.getSourceId()).toBe(16);
});

test("generate page keys", () => {
  expect(key.genPageKey("/woh/l01/")).toBe(160300300);
  expect(key.genPageKey("/t/pwom/woh/l01/")).toBe(160300300);
  expect(key.genPageKey("/t/pwom/wox/l01/")).toBe(-1);
  expect(key.genPageKey("/t/pwom/woh/l01/l01qa/")).toBe(160300301);
});

test("decode key", () => {
  const decodedKey = key.decodeKey(160300300);
  expect(decodedKey.error).toBe(false);
  expect(decodedKey.sid).toBe(16);
  expect(decodedKey.bookId).toBe("woh");
  expect(decodedKey.uid).toBe(3);
  expect(decodedKey.xid).toBe(0);
});

test("decode key", () => {
  const decodedKey = key.decodeKey(170300300);
  expect(decodedKey.error).toBe(true);
});

test("convert key to url", () => {
  expect(key.getUrl(160300300, true)).toBe("/t/pwom/woh/l01/");
  expect(key.getUrl(160300301, true)).toBe("/t/pwom/woh/l01/l01qa/");
});

test("describe key", () => {
  const describedKey = key.describeKey(160300301);
  expect(describedKey.book).toBe("woh");
});

test("gen paragraph key", () => {
  expect(key.genParagraphKey("p34", "/t/wom/woh/l01/l01qa/")).toBe(160300301.035);
});

test("parse key", () => {
  const parsedKey = key.parseKey(160300301.035);
  expect(parsedKey.paraKey).toBe(35);
  expect(parsedKey.pageKey).toBe(160300301);
});


