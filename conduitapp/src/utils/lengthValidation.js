export function lengthValidation(name, value) {
  if (value.length <= 6) {
    return `${name} is too short `;
  }
  return "";
}
