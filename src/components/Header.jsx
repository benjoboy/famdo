import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import { useAppState } from "../state/state.context";

export default function Header(props) {
  const {
    state: { isLoggedIn },
  } = useAppState();

  return (
    <React.Fragment>
      <AppBar themeColor="dark">
        <AppBarSection>
          <button className="k-button k-button-clear" onClick={props.onClick}>
            <span className="k-icon k-i-menu" />
          </button>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 4,
          }}
        />

        <AppBarSection>
          <h1 className="title">Fam.do</h1>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 32,
          }}
        />

        <AppBarSection className="navbar">
          <ul>
            <li>
              <span>What's New</span>
            </li>
            <li>
              <span>About</span>
            </li>
            <li>
              <span>Contacts</span>
            </li>
          </ul>
        </AppBarSection>

        <AppBarSpacer />

        <AppBarSection className="actions navbar">
          <ul>
            {isLoggedIn ? (
              <li>Logout</li>
            ) : (
              <li>
                {" "}
                <a href="/login">Sign in</a>
              </li>
            )}
          </ul>
          <Button className="k-button k-button-clear">
            <BadgeContainer>
              <span className="k-icon k-i-bell" />
              <Badge
                shape="dot"
                themeColor="info"
                size="small"
                position="inside"
              />
            </BadgeContainer>
          </Button>
        </AppBarSection>

        <AppBarSection>
          <span className="k-appbar-separator" />
        </AppBarSection>

        <AppBarSection>
          <Avatar shape="circle" type="image"></Avatar>
        </AppBarSection>
      </AppBar>
    </React.Fragment>
  );
}