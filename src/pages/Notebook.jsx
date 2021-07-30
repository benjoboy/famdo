import React, { useEffect, useState } from "react";
import AddNoteDialog from "../components/notes/addNoteDialog";

export default function Notebook(props) {
  const [noteId, setNoteId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(props.notebook);
  }, []);

  const handleAddNote = (title) => {
    console.log("djedls");
    setShowModal(false);
    props.handleCreateNote(title);
  };
  return (
    <div className="container-fluid">
      {showModal && (
        <AddNoteDialog
          handleAddNote={handleAddNote}
          title="New note"
          onClose={() => setShowModal(false)}
        >
          {" "}
        </AddNoteDialog>
      )}
      <div className="row ">
        <div className="col-3 mt-2">
          <button
            className="btn btn-block btn-primary mb-2"
            onClick={() => setShowModal(true)}
          >
            +&nbsp;Note
          </button>
          <ul>
            {props.notebook.map((note) => (
              <li
                className="link"
                key={note._id}
                onClick={() => setNoteId(note._id)}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9">note editor</div>
      </div>
    </div>
  );
}
