export function removeQuotes(str) {
  if (
    typeof str === "string" &&
    str.length >= 2 &&
    str.charAt(0) === '"' &&
    str.charAt(str.length - 1) === '"'
  ) {
    return str.slice(1, -1);
  } else {
    return str;
  }
}
