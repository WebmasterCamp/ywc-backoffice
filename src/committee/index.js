import React, {Component, Fragment} from "react";

import Candidates from "./Candidates";
import VoteCandidate from "./VoteCandidate";
import Menubar from "../common/Menubar";

export default class Committee extends Component {
  getUserIdentity = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  render() {
    return (
      <Fragment>
        <Menubar
          header={`คัดผู้เข้าสมัครแต่ละสาขา (Committee)`}
          menus={[{icon: "user", name: "คัดคนเข้าสมัคร", to: "/committee"}]}>
          {this.getUserIdentity() === "committee" && <Candidates />}
          {this.getUserIdentity() !== "committee" && <VoteCandidate />}
        </Menubar>
      </Fragment>
    );
  }
}
