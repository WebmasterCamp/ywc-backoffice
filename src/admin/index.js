import React, {Component, Fragment} from "react";

import Candidates from "./Candidates";
import Dashboard from "../dashboard";
import Menubar from "../common/Menubar";

export default class Admin extends Component {
  getRoute = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  getHeader = () => ({
    admin: "Dashboard",
    candidates: "All Candidates",
  });

  render() {
    return (
      <Fragment>
        <Menubar
          header={this.getHeader()[this.getRoute()]}
          menus={[
            {icon: "user", name: "Dashboard", to: "/admin"},
            {icon: "user", name: "All Candidates", to: "/admin/candidates"},
          ]}>
          {this.getRoute() === "candidates" && <Candidates />}
          {this.getRoute() === "admin" && <Dashboard />}
        </Menubar>
      </Fragment>
    );
  }
}
