import React, { useEffect } from "react";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./pages/Register";
import { StateProvider } from "./state/StateProvider";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DrawerRouterContainer from "./components/DrawerRouterContainer";

export const App = () => {
  useEffect(() => {
    document.title = "Fam.do";
  });

  return (
    <div className="App">
      <Router>
        <DrawerRouterContainer>
          <Switch>
            <Route exact={false} path="/" component={Register} />
          </Switch>
        </DrawerRouterContainer>
      </Router>
    </div>
  );
};
