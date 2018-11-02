import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag} from "antd";
import {Link} from "react-router-dom";

import {authen} from "../utils/authen";
import {fetch, fetchWithToken} from "../utils/fetch";
import PaginationStore from "../common/PaginationStore";

const Stat = styled.div`
  color: #777;
  margin-bottom: 20px;
`;

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("committee")
@connect(mapStateToProps)
@observer
export default class Candidates extends Component {
  @observable
  totalCandidates = 0;
  @observable
  candidates = [];
  @observable
  passStaff = 0;
  @observable
  pagination = null;

  columns = [
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
      render: status => (
        <span>
          <Tag color={!status ? "red" : "green"}>
            {!status ? "ยังไม่ได้ตรวจ" : "ตรวจแล้ว"}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "ตรวจแล้ว",
          value: "true",
        },
        {
          text: "ยังไม่ได้ตรวจ",
          value: "false",
        },
      ],
      onFilter: (value, record) => value === `${record.status}`,
    },
    {
      title: "Action",
      key: "action",
      render: data => (
        <Button>
          <Link params={{id: data.id}} to={`/committee/${data.id}`}>
            <Icon type="edit" theme="outlined" /> ตรวจคำถาม
          </Link>
        </Button>
      ),
    },
  ];

  // fetch and render data
  componentDidMount = async () => {
    this.getCandidates();
    this.getStat();
  };

  getCandidates = async () => {
    const {major} = this.props.auth.profile;
    const response = await fetchWithToken("users/committee", {major}, "GET");

    if (response.status === "success") {
      this.candidates = response.payload;
    }

    // set pagination to current page on candidates table
    this.pagination = {current: PaginationStore.currentPage};
  };

  getStat = async () => {
    const userResponse = await fetch("users/stat");
    const users = userResponse.payload;

    const statResponse = await fetchWithToken(
      "users/committee/stat",
      {},
      "GET",
    );

    this.passStaff = statResponse.payload.passStaff;
    this.totalCandidates = users[this.props.auth.profile.major];
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
            จำนวนใบสมัครทั้งหมด {this.totalCandidates} จำนวนที่ผ่านการคัด{" "}
            {this.passStaff} จำนวนที่ตรวจแล้ว{" "}
            {
              this.candidates.filter(
                x => x.committeeVote.indexOf(profile.username) !== -1,
              ).length
            }{" "}
            ({profile.major})
          </Stat>
        </Padding>

        <Table
          columns={this.columns}
          onChange={this.onPageChange}
          pagination={this.pagination}
          dataSource={this.candidates.map((candidate, i) => ({
            key: i + 1,
            id: candidate._id,
            username: profile.username,
            status: candidate.committeeVote.indexOf(profile.username) !== -1,
          }))}
        />
      </Fragment>
    );
  }
}
