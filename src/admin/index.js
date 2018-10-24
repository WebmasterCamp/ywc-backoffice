import React, {Component, Fragment} from "react";

import Candidates from "./Candidates";
import Dashboard from "../dashboard";
import Menubar from "../common/Menubar";

export default class Admin extends Component {
  getRoute = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  render() {
    return (
      <Fragment>
        <Menubar
          header={`Dashboard`}
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
