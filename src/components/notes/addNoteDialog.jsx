import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function AddNoteDialog(props) {
  const [title, setTitle] = useState("");
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  //title={"Delete Data"} onClose={toggleDialog} width={350}
  return (
    <Dialog {...props}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter title"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <DialogActionsBar layout={props.layout}>
        <button
          className="k-button k-primary"
          onClick={() => props.handleAddNote(title)}
        >
          Create note
        </button>
      </DialogActionsBar>
    </Dialog>
  );
}
