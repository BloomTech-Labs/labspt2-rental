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

  // is the length correct
  if (password.length >= 8) {
    result.length = true;
  }

  for (let i = 0; i < password.length; i++) {
    const character = password.charCodeAt(i);
    // is this character capital
    if (character > 64 && character < 91) {
      result.capital = true;
      // is this character lowercase
    } else if (character > 96 && character < 123) {
      result.lowercase = true;
      // is this character special
    } else if (specialCharCodes.includes(character)) {
      result.specChar = true;
      // is this character a number
    } else if (!isNaN(password.charAt(i))) {
      result.number = true;
      // does this character not belong in any of the categories
    } else {
      result.validChar = false;
    }
  }

  // provides a simple check that this password is "good"
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

  //result should now be a dynamic roadmap of if the password is good and also why
  return result;
};
