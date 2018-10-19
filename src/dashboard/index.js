import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";

import Panel from "../ui/Panel";
import {authen} from "../utils/authen";
import {Padding} from "../utils/styled-helper";

const MainStatContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);

  & > div {
    padding: 15px 0;

    & > h1 {
      font-size: 50px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > span {
      font-family: "Kanit";
      color: #6b67a7;
      font-size: 18px;
    }
  }
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen(["admin", "manager"])
@connect(mapStateToProps)
export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Padding>
          <MainStatContainer>
            <Panel>
              <h1>500</h1>
              <span>ยอดผู้สมัครทั้งหมด</span>
            </Panel>
            <Panel>
              <h1>500</h1>
              <span>ยอดผู้สมัครสาขา Programming</span>
            </Panel>
            <Panel>
              <h1>500</h1>
              <span>ยอดผู้สมัครสาขา Maketting</span>
            </Panel>
            <Panel>
              <h1>500</h1>
              <span>ยอดผู้สมัครสาขา Content</span>
            </Panel>
            <Panel>
              <h1>500</h1>
              <span>ยอดผู้สมัครสาขา Design</span>
            </Panel>
          </MainStatContainer>
        </Padding>
      </Fragment>
    );
  }
}
