import React from "react";
import { useAppState } from "../state/state.context";

export default function Footer() {
  const {
    state: { name },
  } = useAppState();
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
