export const complexityCheck = password => {
  const result = {
    length: false,
    specChar: false,
    number: false,
    capital: false,
    lowercase: false,
    validChar: true,
    validPW: false
  };
  //  special characters, in order ["!", "#", "$", "%", "&", "?", "@", "^", "~"];
  const specialCharCodes = [33, 35, 36, 37, 38, 63, 64, 94, 126];

  if (password.length >= 8) {
    result.length = true;
  }

  for (let i = 0; i < password.length; i++) {
    const character = password.charCodeAt(i);
    if (character > 64 && character < 91) {
      result.capital = true;
    } else if (character > 96 && character < 123) {
      result.lowercase = true;
    } else if (specialCharCodes.includes(character)) {
      result.specChar = true;
    } else if (!isNaN(password.charAt(i))) {
      result.number = true;
    } else {
      result.validChar = false;
    }
  }

  if (
    result.length &&
    result.specChar &&
    result.number &&
    result.capital &&
    result.lowercase &&
    result.validChar
  ) {
    result.validPW = true;
  }

  return result;
};
