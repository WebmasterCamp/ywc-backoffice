import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag} from "antd";
import {Link} from "react-router-dom";

import PaginationStore from "../common/PaginationStore";
import {authen} from "../utils/authen";
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
    render: data => (
      <Button>
        <Link params={{id: data.id}} to={`/staff/${data.id}`}>
          <Icon type="edit" theme="outlined" /> ตรวจคำถามกลาง
        </Link>
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
export default class Candidates extends Component {
  @observable
  totalCandidates = 0;
  @observable
  candidates = [];
  @observable
  pagination = null;

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

    // set pagination to current page on candidates table
    this.pagination = {current: PaginationStore.currentPage};
  };

  getStat = async () => {
    const response = await fetch("users/stat");
    const {payload} = response;

    this.totalCandidates = payload[this.props.auth.profile.major];
  };

  onPageChange = pagination => {
    PaginationStore.currentPage = pagination.current;
    this.pagination = {current: pagination.current};
  };

  render() {
    const {profile} = this.props.auth;

    return (
      <Fragment>
        <Padding>
          <Stat>
            ตรวจแล้ว {this.totalCandidates - this.candidates.length} คน,
            คนสมัครสาขา {profile.major} ทั้งหมด {this.totalCandidates} คน (
            {this.totalCandidates - this.candidates.length}/
            {this.totalCandidates})
          </Stat>
        </Padding>

        <Table
          columns={columns}
          onChange={this.onPageChange}
          pagination={this.pagination}
          dataSource={this.candidates.map((candidate, i) => ({
            key: i + 1,
            id: candidate._id,
            status: ["Not checked"],
          }))}
        />
      </Fragment>
    );
  }
}
