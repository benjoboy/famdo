import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function AddFamilyDialog(props) {
  const [name, setName] = useState("Family name");
  const handleChange = (event) => {
    setName(event.target.value);
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
          value={name}
        />
      </div>
      <DialogActionsBar layout={props.layout}>
        <button
          className="k-button k-primary"
          onClick={() => props.handleCreateFamily(name)}
        >
          Create family
        </button>
      </DialogActionsBar>
    </Dialog>
  );
}
