export function validateEmail(email) {
  let result = emailValidate(email);
  if (result) {
    return "";
  }
  if (!result) {
    return "email is not valid";
  }
}

function emailValidate(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
