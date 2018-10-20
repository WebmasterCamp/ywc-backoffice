import React, {Component, Fragment} from "react";

import Dashboard from "../dashboard";
import Menubar from "../common/Menubar";

export default class Admin extends Component {
  getUserIdentity = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  render() {
    return (
      <Fragment>
        <Menubar
          header={`Dashboard`}
          menus={[{icon: "user", name: "Dashboard", to: "/admin"}]}>
          <Dashboard />
        </Menubar>
      </Fragment>
    );
  }
}
