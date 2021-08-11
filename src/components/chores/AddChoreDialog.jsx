import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DatePicker } from "@progress/kendo-react-dateinputs";

export default function AddChoreDialog(props) {
  const [name, setName] = useState("Chore name");
  const [description, setDescription] = useState("Description");
  const [points, setPoints] = useState(100);
  const [deadline, setDeadline] = useState(new Date());

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "points":
        setPoints(event.target.value);
        break;
      case "deadline":
        setDeadline(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Dialog {...props}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Chore name"
          onChange={(e) => handleChange(e)}
          value={name}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows="3"
          id="description"
          name="description"
          type="textarea"
          className="form-control"
          placeholder="Chore description"
          onChange={(e) => handleChange(e)}
          value={description}
        />
        <label htmlFor="exampleInputEmail1">Points</label>
        <input
          id="points"
          name="points"
          type="number"
          className="form-control"
          onChange={(e) => handleChange(e)}
          value={points}
        />
        <label htmlFor="deadline">Deadline</label>
        <br />
        <DatePicker
          format={"dd-MMM-yyyy"}
          id="deadline"
          value={deadline}
          name="deadline"
          onChange={handleChange}
        />
      </div>

      <DialogActionsBar layout={props.layout}>
        <button
          className="k-button k-primary"
          onClick={() =>
            props.handleAddChore(name, description, points, deadline)
          }
        >
          Create note
        </button>
      </DialogActionsBar>
    </Dialog>
  );
}
