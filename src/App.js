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
import { getFamily } from "./api/getFamily";
import { useAppState } from "./state/state.context";
import { deleteEvent } from "./api/deleteEvent";
import { createEvent } from "./api/createEvent";
import { updateEvent } from "./api/updateEvent";
import useInterval from "./hooks/useInterval";

export const App = () => {
  const [family, setFamily] = useState({ schedule: [] });
  const {
    state: { families },
  } = useAppState();

  const loadFamily = async () => {
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
  };

  useInterval(loadFamily, 5000);

  /*const deleteEvent = async (data) => {
    try {
      const res = await loginApi(data.email, data.password);
      let family;
      if (user.families) {
        family = await getFamily(user.families);
      }
      console.log("login fam", family);
      dispatch({ type: "LOGIN", user: user, family: family });
      history.push("/");
    } catch (e) {
      console.log(e, "error login");
    }
  };*/

  const handleScheduleChange = React.useCallback(
    ({ created, updated, deleted }) => {
      created.forEach(async (created) => {
        try {
          let event = await createEvent(created);
          event.item2.start = new Date(event.item2.start);
          event.item2.end = new Date(event.item2.end);
          setFamily((old) => {
            let schedule = old.schedule.concat(Object.assign({}, event.item2));
            let newFamily = { ...old };
            newFamily.schedule = schedule;
            return newFamily;
          });
        } catch (e) {
          console.log(e, "error creating event");
        }
      });

      deleted.forEach(async (deletedEl) => {
        try {
          await deleteEvent(deletedEl._id);
          setFamily((old) => {
            let schedule = old.schedule.filter(
              (item) => (deletedEl._id === item._id) === undefined
            );
            let newFamily = { ...old };
            newFamily.schedule = schedule;
            return newFamily;
          });
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

  useEffect(() => {
    document.title = "Fam.do";
    loadFamily();
  }, [families]);

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
          </Switch>
        </DrawerRouterContainer>
      </Router>
    </div>
  );
};
