import React from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useAppState } from "../state/state.context";
import { logoutApi } from "../api/auth/logout";
import { useHistory } from "react-router";

export default function Header(props) {
  const {
    state: { isLoggedIn },
    dispatch,
  } = useAppState();
  const history = useHistory();

  const handleLogout = async (data) => {
    try {
      const res = await logoutApi();
      console.log(res);
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.log(e, "error logout");
    } finally {
      history.push("/login");
    }
  };

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

        <AppBarSpacer />
        <AppBarSection className="actions navbar">
          <ul>
            <li>
              <a href="/settings ">Settings</a>
            </li>
          </ul>
        </AppBarSection>
        <AppBarSection>
          <span className="k-appbar-separator" />
        </AppBarSection>

        <AppBarSection className="actions navbar">
          <ul>
            {isLoggedIn ? (
              <li>
                <div onClick={handleLogout}>Logout</div>
              </li>
            ) : (
              <li>
                {" "}
                <a href="/login">Sign in</a>
              </li>
            )}
          </ul>
        </AppBarSection>

        <AppBarSection></AppBarSection>
      </AppBar>
    </React.Fragment>
  );
}
