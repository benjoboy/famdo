import React, { useEffect, useState } from "react";
import AddNoteDialog from "../components/notes/addNoteDialog";
import Note from "../components/notes/note";

export default function Notebook(props) {
  const [noteId, setNoteId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (props.notebook.length > 0) setNoteId(props.notebook[0]._id);
  }, [props.notebook]);

  const handleAddNote = (title) => {
    console.log("djedls");
    setShowModal(false);
    props.handleCreateNote(title);
  };
  if (props.notebook) {
    var noteList = props.notebook.map((note) => (
      <li className="link" key={note._id} onClick={() => setNoteId(note._id)}>
        {note.title}
      </li>
    ));
  }

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
        <div className="col-2 mt-2">
          <button
            className="btn  btn-primary  mb-2"
            onClick={() => setShowModal(true)}
            style={{ width: "100%" }}
          >
            +&nbsp;Note
          </button>
          <ul>{noteList}</ul>
        </div>
        <div className="col-10">
          <Note
            handleNoteChange={props.handleNoteChange}
            noteId={noteId}
            notebook={props.notebook}
            deleteNote={props.deleteNote}
            handleTitleChange={props.handleTitleChange}
          ></Note>
        </div>
      </div>
    </div>
  );
}
