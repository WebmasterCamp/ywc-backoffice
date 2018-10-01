import React, {Fragment} from "react";
import {Route} from "react-router-dom";

import Login from "../login";

export default () => (
  <Fragment>
    <Route exact path="/" component={Login} />
  </Fragment>
);
