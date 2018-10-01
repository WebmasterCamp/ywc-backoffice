import React, {Fragment} from "react";
import {Route} from "react-router-dom";

import Login from "../login";
import Staff from "../staff";

export default () => (
  <Fragment>
    <Route exact path="/" component={Login} />
    <Route path="/staff" component={Staff} />
  </Fragment>
);
