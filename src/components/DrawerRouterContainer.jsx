import React from "react";

import { withRouter } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import Header from "./Header";

const items = [
  { name: "dashboard", icon: "k-i-grid", selected: true, route: "/" },
  { name: "planning", icon: "k-i-calendar", route: "/planning" },
  { name: "profile", icon: "k-i-user", route: "/profile" },
  { separator: true },
  { name: "info", icon: "k-i-information", route: "/info" },
  { name: "login", icon: "k-i-information", route: "/login" },
  { name: "register", icon: "k-i-information", route: "/register" },
];

class DrawerRouterContainer extends React.Component {
  state = {
    expanded: true,
    selectedId: items.findIndex((x) => x.selected === true),
    isSmallerScreen: window.innerWidth < 768,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);
    this.resizeWindow();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    this.setState({ isSmallerScreen: window.innerWidth < 768 });
  };

  handleClick = () => {
    this.setState((e) => ({ expanded: !e.expanded }));
  };

  handleSelect = (e) => {
    this.setState({ selectedId: e.itemIndex, expanded: false });
    this.props.history.push(e.itemTarget.props.route);
  };

  getSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath) {
      if (currentPath.name) {
        return currentPath.name;
      }
    }
  };
  render() {
    let selected = this.getSelectedItem(this.props.location.pathname);

    return (
      <React.Fragment>
        <Header onClick={this.handleClick} />
        <Drawer
          expanded={this.state.expanded}
          animation={{ duration: 100 }}
          items={items.map((item) => ({
            ...item,
            text: item.name,
            selected: item.name === selected,
          }))}
          position="start"
          mode={this.state.isSmallerScreen ? "overlay" : "push"}
          mini={this.state.isSmallerScreen ? false : true}
          onOverlayClick={this.handleClick}
          onSelect={this.handleSelect}
        >
          <DrawerContent>{this.props.children}</DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withRouter(DrawerRouterContainer);
