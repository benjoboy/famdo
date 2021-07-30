import React, { useEffect, useState } from "react";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Register from "./pages/Register";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DrawerRouterContainer from "./components/DrawerRouterContainer";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";
import Notebook from "./pages/Notebook";
import { getFamily } from "./api/getFamily";
import { useAppState } from "./state/state.context";
import deleteEvent from "./api/event/deleteEvent";
import { createEvent } from "./api/event/createEvent";
import { updateEvent } from "./api/event/updateEvent";
import useInterval from "./hooks/useInterval";
import { createNote } from "./api/note/createNote";

export const App = () => {
  const [family, setFamily] = useState({ schedule: [], notebook: [] });
  const {
    state: { families },
  } = useAppState();

  //loads family
  const loadFamily = React.useCallback(async () => {
    console.log("updatig family");
    try {
      if (families) {
        var family1 = await getFamily(families);
        const schedule = family1.schedule.map((item) => {
          item.start = new Date(item.start);
          item.end = new Date(item.end);
          return item;
        });
        family1.schedule = schedule;
        setFamily(family1);
      }
    } catch (e) {
      console.log("error loading family in app");
    }
  }, [families]);

  useInterval(loadFamily, 10000);

  //handles update, delete and create event in schedule
  const handleScheduleChange = React.useCallback(
    ({ created, updated, deleted }) => {
      created.forEach(async (created) => {
        try {
          let event = await createEvent(created);
          if (event.status === "created") {
            event.item2.start = new Date(event.item2.start);
            event.item2.end = new Date(event.item2.end);
            setFamily((old) => {
              let schedule = old.schedule.concat(
                Object.assign({}, event.item2)
              );
              let newFamily = { ...old };
              newFamily.schedule = schedule;
              return newFamily;
            });
          }
        } catch (e) {
          console.log(e, "error creating event");
        }
      });

      deleted.forEach(async (deletedEl) => {
        try {
          const res = await deleteEvent(deletedEl._id);
          if (res.status === "deleted") {
            setFamily((old) => {
              let schedule = old.schedule.filter(
                (item) => (deletedEl._id === item._id) === undefined
              );
              let newFamily = { ...old };
              newFamily.schedule = schedule;
              return newFamily;
            });
          }
        } catch (e) {
          console.log(e, "error deleting event");
        }
      });

      updated.forEach(async (updatedEl) => {
        try {
          await updateEvent(updatedEl);
          setFamily((old) => {
            let schedule = old.schedule.map((item) =>
              updatedEl._id === item._id ? updatedEl : item
            );
            let newFamily = { ...old };
            newFamily.schedule = schedule;
            return newFamily;
          });
        } catch (e) {
          console.log(e, "error creating event");
        }
      });
    },
    [setFamily]
  );

  const handleCreateNote = async (title) => {
    const note = {
      title: title,
      content: "",
    };

    try {
      const res = await createNote(note);
      console.log(res);
      if (res.status === "created") {
        setFamily((old) => {
          let notebook = old.notebook.concat(Object.assign({}, res.item2));
          let newFamily = { ...old };
          newFamily.notebook = notebook;
          return newFamily;
        });
      }
    } catch (e) {
      console.log(e, "error creating a note");
    }
  };

  const handleNoteChange = (content, noteId) => {
    setFamily((old) => {
      const noteIndex = old.notebook.findIndex((note) => note._id === noteId);
      let newNotebook = [...old.notebook];

      newNotebook[noteIndex] = {
        ...newNotebook[noteIndex],
        content: content,
      };

      let newFamily = { ...old };
      newFamily.notebook = newNotebook;
      console.log(newFamily);
      return newFamily;
    });
  };

  //componentDidMount
  useEffect(() => {
    document.title = "Fam.do";
    loadFamily();
  }, [loadFamily]);

  return (
    <div className="App">
      <Router>
        <DrawerRouterContainer>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/settings" component={Settings} />
            <Route
              exact
              path="/schedule"
              render={(props) => (
                <Schedule
                  {...props}
                  schedule={family.schedule}
                  handleScheduleChange={handleScheduleChange}
                />
              )}
            />
            <Route
              exact
              path="/notes"
              render={(props) => (
                <Notebook
                  {...props}
                  notebook={family.notebook}
                  handleCreateNote={handleCreateNote}
                  handleNoteChange={handleNoteChange}
                />
              )}
            />
          </Switch>
        </DrawerRouterContainer>
      </Router>
    </div>
  );
};
