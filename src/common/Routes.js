import React, {Fragment} from "react";
import {Route} from "react-router-dom";

import Login from "../login";
import Staff from "../staff";
import committee from "../committee";

export default () => (
  <Fragment>
    <Route exact path="/" component={Login} />

    <Route path="/staff" component={Staff} />

    <Route path="/committee" component={committee} />
  </Fragment>
);
