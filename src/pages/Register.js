import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import {
  emailValidator,
  passwordValidator,
  requiredValidator,
} from "../components/form/validators";
import CustomInput from "../components/form/CustomInput";
import PasswordInput from "../components/form/PasswordInput";

export default function Register() {
  const handleSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <div id="Profile" className="pt-5 d-flex justify-content-center">
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement horizontal={true} className="w-50">
            <legend className={"k-form-legend"}>Register</legend>
            <Field
              label="Name"
              name="name"
              component={CustomInput}
              validator={requiredValidator}
            />
            <Field label="Surname" name="surname" component={Input} />
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
