import React, { useEffect } from "react";
import {
  Scheduler,
  AgendaView,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";

export default function Schedule(props) {
  const modelFields = {
    id: "_id",
  };

  useEffect(() => {
    console.log("serr", props.schedule);
  }, [props.schedule]);

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
