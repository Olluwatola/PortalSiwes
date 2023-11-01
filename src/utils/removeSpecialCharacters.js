export function removeSpecialCharacters(inputString) {
  let result = "";

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (isAlphanumeric(char)) {
      result += char;
    }
  }
  console.log(result);

  return result;
}

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122) ||
    (code >= 48 && code <= 57)
  );
}
