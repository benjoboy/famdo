import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import Header from "./Header";
import { useAppState } from "../state/state.context";
import { loggedIn } from "../api/auth/loggedIn";
import { getFamily } from "../api/family/getFamily";

const items = [
  { name: "dashboard", icon: "k-i-grid", selected: true, route: "/" },
  { name: "schedule", icon: "k-i-calendar", route: "/schedule" },
  { name: "notes", icon: "k-i-dictionary-add", route: "/notes" },
  { name: "chores", icon: "k-i-trash", route: "/chores" },
];

export default function DrawerRouterContainer(props) {
  const [expanded, setExpanded] = useState(false);
  const [isSmallerScreen, setIsSmallerScreen] = useState(
    window.innerWidth < 768
  );
  const history = useHistory();
  const { dispatch, userId } = useAppState();

  const resizeWindow = () => {
    setIsSmallerScreen(window.innerWidth < 768);
  };

  const handleClick = (e) => {
    setExpanded(!expanded);
  };

  const handleSelect = (e) => {
    setExpanded(false);
    history.push(e.itemTarget.props.route);
  };

  useEffect(() => {
    const checkLoggedIn = async (data) => {
      try {
        const res = await loggedIn();
        let family;
        console.log(res);
        if (res.user.families) {
          family = await getFamily(res.user.families);
        }
        if (res.logged_in)
          dispatch({ type: "LOGIN", user: res.user, family: family });
        else history.push("/login");
      } catch (e) {
        console.log(e, "error checking login status");
      }
    };

    console.log("drawerRouterContainer onMount called");
    checkLoggedIn();
    window.addEventListener("resize", resizeWindow);
    resizeWindow();
    /*console.log("user", userId);
    if (
      (!userId || userId === "") &&
      window.location.pathname !== "/register"
    ) {
      history.push("/login");
    }*/
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [dispatch, userId, history]);

  const getSelectedItem = (pathName) => {
    let currentPath;
    currentPath = items.find((item) => item.route === pathName);
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
