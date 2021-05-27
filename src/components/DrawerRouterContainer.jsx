import React, { useEffect, useState } from "react";

import { useHistory, withRouter } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import Header from "./Header";
import { useAppState } from "../state/state.context";

const items = [
  { name: "dashboard", icon: "k-i-grid", selected: true, route: "/" },
  { name: "planning", icon: "k-i-calendar", route: "/planning" },
  { name: "profile", icon: "k-i-user", route: "/profile" },
  { separator: true },
  { name: "info", icon: "k-i-information", route: "/info" },
  { name: "login", icon: "k-i-information", route: "/login" },
  { name: "register", icon: "k-i-information", route: "/register" },
];

export default function DrawerRouterContainer(props) {
  const [expanded, setExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState(
    items.findIndex((x) => x.selected === true)
  );
  const [isSmallerScreen, setIsSmallerScreen] = useState(
    window.innerWidth < 768
  );
  const history = useHistory();
  const { dispatch } = useAppState();

  const resizeWindow = () => {
    setIsSmallerScreen(window.innerWidth < 768);
  };

  const handleClick = (e) => {
    setExpanded(!expanded);
  };

  const handleSelect = (e) => {
    setSelectedId(e.itemIndex);
    setExpanded(false);
    history.push(e.itemTarget.props.route);
  };

  useEffect(() => {
    dispatch({ type: "CHECK_SESSION" });
    window.addEventListener("resize", resizeWindow);
    resizeWindow();
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  const getSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath) {
      if (currentPath.name) {
        return currentPath.name;
      }
    }
  };
  let selected = getSelectedItem(history.location.pathname);

  return (
    <React.Fragment>
      <Header onClick={handleClick} />
      <Drawer
        expanded={expanded}
        animation={{ duration: 100 }}
        items={items.map((item) => ({
          ...item,
          text: item.name,
          selected: item.name === selected,
        }))}
        position="start"
        mode={isSmallerScreen ? "overlay" : "push"}
        mini={isSmallerScreen ? false : true}
        onOverlayClick={handleClick}
        onSelect={handleSelect}
      >
        <DrawerContent>{props.children}</DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}
