import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import styled from "styled-components";

import Login from "../login";
import Staff from "../staff";
import Committee from "../committee";
import Admin from "../admin";

const ReportBug = styled.a`
  display: block;
  background: #041527;
  color: #eee;
  border-radius: 5px;
  padding: 10px 25px;

  position: fixed;
  bottom: 30px;
  right: 30px;

  &:hover {
    color: #ccc;
  }
`;

export default () => (
  <Fragment>
    <Route exact path="/" component={Login} />

    <Route path="/staff" component={Staff} />

    <Route path="/committee" component={Committee} />

    <Route path="/admin" component={Admin} />

    <ReportBug href="https://www.messenger.com/t/chun42" target="_blank">
      Report Bugs
    </ReportBug>
  </Fragment>
);
