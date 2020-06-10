import language from "../../lang.js";
import notify from "toastr";

/*
 * Get string for argument 'key'. Key can be in two parts
 * delimited by a ':'. The second part is optional.
 */
export function getString(key) {
  if (typeof key !== "string") {
    return null;
  }

  let [s,k] = key.split(":");

  if (!language[s]) {
    return null;
  }

  if (!k) {
    return language[s];
  }

  if (!language[s][k]) {
    return null;
  }

  return language[s][k];
}

/*
 * This is a tagged template function that populates
 * a template string with values from the language
 * object.
 */
export function __lang(strings, ...values) {
  const tokens = values.map(value => {
    let t = getString(value);
    if (!t) {
      return value;
    }
    return t;
  });

  return strings.reduce((result, string, i) => {
    return `${result}${string}${tokens[i] || ""}`;
  }, "");
}

