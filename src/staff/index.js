import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag} from "antd";

import {authen} from "../utils/authen";
import Menubar from "../common/Menubar";
import {fetch, fetchWithToken} from "../utils/fetch";

const Stat = styled.div`
  color: #777;
  margin-bottom: 20px;
`;

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const columns = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "User ID.",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: tags => (
      <span>
        {tags.map(tag => (
          <Tag color="red" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button>
        <Icon type="edit" theme="outlined" /> ตรวจคำถามกลาง
      </Button>
    ),
  },
];

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("staff")
@connect(mapStateToProps)
@observer
export default class Staff extends Component {
  @observable
  totalCandidates = 0;
  @observable
  candidates = [];

  // fetch and render data
  componentDidMount = async () => {
    this.getCandidates();
    this.getStat();
  };

  getCandidates = async () => {
    const {major} = this.props.auth.profile;
    const response = await fetchWithToken("users/staff", {major}, "GET");

    if (response.status === "success") {
      this.candidates = response.payload;
    }
  };

  getStat = async () => {
    const response = await fetch("users/stat");
    const {payload} = response;

    this.totalCandidates = payload[this.props.auth.profile.major];
  };

  render() {
    const {auth} = this.props;

    return (
      <Fragment>
        <Menubar
          header={`คัดคนเข้าสมัครสาขา ${auth.profile.major}`}
          menus={[{icon: "user", name: "คัดคนเข้าสมัคร"}]}>
          <Padding>
            <Stat>{`ตรวจแล้ว ${this.totalCandidates -
              this.candidates.length} คน, คนสมัครทั้งหมด ${
              this.totalCandidates
            } คน`}</Stat>
          </Padding>

          <Table
            columns={columns}
            dataSource={this.candidates.map((candidate, i) => ({
              key: i + 1,
              id: candidate._id,
              status: ["Not checked"],
            }))}
          />
        </Menubar>
      </Fragment>
    );
  }
}
