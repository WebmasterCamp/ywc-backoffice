import React from "react";
import {Route} from "react-router-dom";

export default () => (
  <div>
    <Route exact path="/" render={() => <h1>this is a home page</h1>} />
    <Route path="/login" render={() => <h1>this is a login page</h1>} />
  </div>
);
