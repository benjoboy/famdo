import React from "react";
import {
  Scheduler,
  AgendaView,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";
import { FormWithCustomEditor } from "../components/scheduler/customForm";

export default function Schedule(props) {
  const modelFields = {
    id: "_id",
  };

  return (
    <Scheduler
      defaultView="day"
      data={props.schedule}
      onDataChange={props.handleScheduleChange}
      editable={{
        remove: true,
        resize: true,
        add: true,
        edit: true,
        select: true,
        drag: true,
      }}
      modelFields={modelFields}
    >
      <DayView />
      <WeekView />
      <MonthView />
      <AgendaView />
    </Scheduler>
  );
}
