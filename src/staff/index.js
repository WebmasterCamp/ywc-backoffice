import React, {Component, Fragment} from "react";

import Candidates from "./Candidates";
import CheckCandidate from "./CheckCandidate";
import Menubar from "../common/Menubar";

export default class Staff extends Component {
  getUserIdentity = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  render() {
    return (
      <Fragment>
        <Menubar
          header={`คัดผู้เข้าสมัครจากคำถามกลาง (Staff)`}
          menus={[{icon: "user", name: "คัดคนเข้าสมัคร"}]}>
          {this.getUserIdentity() === "staff" && <Candidates />}
          {this.getUserIdentity() !== "staff" && <CheckCandidate />}
        </Menubar>
      </Fragment>
    );
  }
}
