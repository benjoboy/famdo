import React from "react";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import {
  emailValidator,
  passwordValidator,
} from "../components/form/validators";
import PasswordInput from "../components/form/PasswordInput";
import CustomInput from "../components/form/CustomInput";

export default function Login() {
  const handleSubmit = (data) => {};

  return (
    <div id="Login" className="pt-5 d-flex justify-content-center">
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement horizontal={true} className="w-50">
            <legend className={"k-form-legend"}>Login</legend>
            <Field
              label="Email"
              name="email"
              component={CustomInput}
              validator={emailValidator}
            />
            <Field
              label="Password"
              name="password"
              component={PasswordInput}
              validator={passwordValidator}
            />
            <div className="k-form-buttons">
              <Button
                type={"submit"}
                className="k-button"
                primary
                disabled={!formRenderProps.allowSubmit}
              >
                Submit
              </Button>
              <Button onClick={formRenderProps.onFormReset}>Clear</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
}
