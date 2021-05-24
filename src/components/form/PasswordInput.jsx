import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";

export default function CustomInput(fieldRenderProps) {
  const { validationMessage, touched, ...others } = fieldRenderProps;
  return (
    <div>
      <Input type="password" {...others} />
      {touched && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
}
