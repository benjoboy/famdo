import React, { useEffect } from "react";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Register from "./pages/Register";
import { StateProvider } from "./state/StateProvider";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DrawerRouterContainer from "./components/DrawerRouterContainer";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

export const App = () => {
  useEffect(() => {
    document.title = "Fam.do";
  }, []);

  return (
    <div className="App">
      <Router>
        <StateProvider>
          <DrawerRouterContainer>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/settings" component={Settings} />
            </Switch>
          </DrawerRouterContainer>
        </StateProvider>
      </Router>
    </div>
  );
};
