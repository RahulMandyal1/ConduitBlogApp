function notEmpty(value, name) {
    if (value.length <= 0) {
      return `${name} should not be empty`;
    }
    return "";
  }
  function lengthValidation(name, value) {
    if (value.length <= 6) {
      return `${name} is too short `;
    }
    return "";
  }
  
  function validateEmail(email) {
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
  
  
  export  {notEmpty , lengthValidation , validateEmail};