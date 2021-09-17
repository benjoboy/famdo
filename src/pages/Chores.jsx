import React, { useEffect, useState } from "react";
import AddChoreDialog from "../components/chores/AddChoreDialog";
import { ListView } from "@progress/kendo-react-listview";
import ChoreItem, { MyHeader } from "../components/chores/CustomListViewItem";

export default function Chores(props) {
  const [showModal, setShowModal] = useState(false);
  const [chores, setChores] = useState([]);

  const handleAddChore = (name, description, points, deadline) => {
    const chore = { name, description, points, deadline };
    props.handleCreateChore(chore);
    setShowModal(false);
  };
  const handleDelete = (choreId) => {
    props.handleChoreDelete(choreId);
    window.location.reload();
  };

  const handleCompletion = (choreId, points) => {
    props.handleChoreCompleted(choreId, points);
    window.location.reload();
  };

  const MyCustomItem = (props) => (
    <ChoreItem
      {...props}
      handleChoreDelete={handleDelete}
      handleChoreCompleted={handleCompletion}
    />
  );

  useEffect(() => {
    setChores(props.chores.filter((chore) => chore.completed === false));
  }, [props.chores]);

  return (
    <div className="m-2">
      {showModal && (
        <AddChoreDialog
          handleAddChore={handleAddChore}
          title="New Chore"
          onClose={() => setShowModal(false)}
        >
          {" "}
        </AddChoreDialog>
      )}
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary mb-2"
      >
        + Chore
      </button>

      <ListView header={MyHeader} data={chores} item={MyCustomItem} />
    </div>
  );
}
