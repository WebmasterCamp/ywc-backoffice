import React, {Component, Fragment} from "react";

import Menubar from "../common/Menubar";

class Staff extends Component {
  render() {
    return (
      <Fragment>
        <Menubar
          header="ตรรจคนสมัครสาขา Programming"
          menus={[{icon: "user", name: "Helloword"}]}>
          <h1>Hello</h1>
        </Menubar>
      </Fragment>
    );
  }
}

export default Staff;
