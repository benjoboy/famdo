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

export const App = () => {
  const [family, setFamily] = useState({ schedule: [{ title: "hfe" }] });
  const {
    state: { families },
  } = useAppState();

  useEffect(() => {
    const loadFamily = async () => {
      try {
        if (families) {
          var family1 = await getFamily(families);
          console.log(family1);
          const schedule = family1.schedule.map((item) => {
            item.start = new Date(item.start);
            item.end = new Date(item.end);
            return item;
          });
          family1.schedule = schedule;
          console.log("yello", family1);
          setFamily(family1);
        }
      } catch (e) {
        console.log("error loading family in app");
      }
    };
    document.title = "Fam.do";
    loadFamily();
  }, [families]);

  return (
    <div className="App">
      <h1>{}</h1>
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
                <Schedule {...props} schedule={family.schedule} />
              )}
            />
          </Switch>
        </DrawerRouterContainer>
      </Router>
    </div>
  );
};
