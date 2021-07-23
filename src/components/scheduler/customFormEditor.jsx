import * as React from "react";
import { SchedulerFormEditor } from "@progress/kendo-react-scheduler";
export const CustomFormEditor = (props) => {
  return <SchedulerFormEditor {...props} startTimezoneCheckedEditor={false} />;
};
