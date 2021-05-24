import { getter } from "@progress/kendo-react-common";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
/*const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);
*/

export const requiredValidator = (value) =>
  value ? "" : "This field is required";
export const termsValidator = (value) =>
  value ? "" : "It's required to agree with Terms and Conditions.";
export const emailValidator = (value) =>
  !value
    ? "Email field is required."
    : emailRegex.test(value)
    ? ""
    : "Email is not in a valid format.";
export const nameValidator = (value) =>
  !value
    ? "Full Name is required"
    : value.length < 7
    ? "Full Name should be at least 7 characters long."
    : "";
export const passwordValidator = (value) =>
  !value
    ? "Password is required"
    : value.length < 7
    ? "Password should be a least 7 characters long."
    : "";
export const userNameValidator = (value) =>
  !value
    ? "User Name is required"
    : value.length < 5
    ? "User name should be at least 5 characters long."
    : "";

const userNameGetter = getter("username");
const emailGetter = getter("email");

export const formValidator = (values) => {
  const userName = userNameGetter(values);
  const emailValue = emailGetter(values);

  if (userName && emailValue && emailRegex.test(emailValue)) {
    return {};
  }

  return {
    VALIDATION_SUMMARY: "Please fill in the following fields.",
    ["username"]: !userName ? "User Name is required." : "",
    ["email"]:
      emailValue && emailRegex.test(emailValue)
        ? ""
        : "Email is required and should be in a valid format.",
  };
};
