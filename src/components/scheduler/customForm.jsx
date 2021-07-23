import * as React from "react";
import { SchedulerForm } from "@progress/kendo-react-scheduler";
import { CustomFormEditor } from "./customFormEditor";

export const FormWithCustomEditor = (props) => {
  return <SchedulerForm {...props} editor={CustomFormEditor} />;
};
