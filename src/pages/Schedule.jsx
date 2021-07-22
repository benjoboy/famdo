import React, { useEffect } from "react";
import {
  Scheduler,
  AgendaView,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";

export default function Schedule(props) {
  useEffect(() => {
    console.log("serr", props.schedule);
  }, [props.schedule]);

  const modelFields = {
    id: "_id",
    title: "title",
    start: "start",
    end: "end",
  };

  return (
    <Scheduler
      defaultView="day"
      data={props.schedule}
      modelFields={modelFields}
    >
      <DayView />
      <WeekView />
      <MonthView />
      <AgendaView />
    </Scheduler>
  );
}
