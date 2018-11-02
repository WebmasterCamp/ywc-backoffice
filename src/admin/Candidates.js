import React, {Component, Fragment} from "react";
import styled from "styled-components";
import moment from "moment";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag, Input} from "antd";

import {authen} from "../utils/authen";
import {fetchWithToken} from "../utils/fetch";
import {applyBoxShadow} from "../utils/styled-helper";
import {MAJOR} from "../utils/const";
import CandidateModal from "./CandidateModal";
import PaginationStore from "../common/PaginationStore";

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const CustomSearch = applyBoxShadow(styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`);

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("admin")
@connect(mapStateToProps)
@observer
export default class Candidates extends Component {
  @observable
  candidates = [];
  @observable
  candidateData = {};
  @observable
  showCandidateModal = false;
  @observable
  pagination = null;

  state = {
    searchText: "",
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({searchText: selectedKeys[0]});
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({searchText: ""});
  };

  // fetch and render data
  componentDidMount = async () => {
    this.getCandidates();
  };

  getCandidates = async () => {
    const {major} = this.props.auth.profile;
    const response = await fetchWithToken("users/all", {major}, "GET");

    if (response.status === "success") {
      this.candidates = response.payload;
    }

    // set pagination to current page on candidates table
    this.pagination = {current: PaginationStore.currentPage};
  };

  // TODO: render isAnswerGeneral, isAnswerMajar status
  columns = [
    {
      title: "Name",
      key: "name",
      render: user => (
        <span>
          {user.firstNameEN} {user.lastNameEN} ({user.nickname})
        </span>
      ),
      fixed: "left",

      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <CustomSearch>
          <Input
            style={{marginBottom: "7px"}}
            ref={ele => (this.searchInput = ele)}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button
            type="primary"
            style={{marginRight: "7px"}}
            onClick={this.handleSearch(selectedKeys, confirm)}>
            Search
          </Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </CustomSearch>
      ),

      filterIcon: filtered => (
        <Icon type="search" style={{color: filtered ? "#108ee9" : "#aaa"}} />
      ),

      onFilter: (value, record) => {
        const name = `${record.firstNameEN} ${record.lastNameEN} ${
          record.firstName
        } ${record.lastName} ${record.nickname}`;
        return name.toLowerCase().includes(value.toLowerCase());
      },

      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
    },
    {
      title: "User Identity",
      key: "_id",
      dataIndex: "_id",
    },
    {
      title: "Thai Name",
      key: "thainame",
      render: user => (
        <span>
          {user.firstName} {user.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: status => (
        <span>
          <Tag color={status === "completed" ? "green" : "volcano"}>
            {status}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "Completed",
          value: "completed",
        },
        {
          text: "In Progress",
          value: "in progress",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      filters: MAJOR.map(x => ({text: x.name, value: x.value})),
      onFilter: (value, record) => record.major === value,
      render: major => {
        if (major === undefined) {
          return "Unknowed";
        } else {
          return (
            <span>
              <Tag color={MAJOR.filter(x => x.value === major)[0].color}>
                {major}
              </Tag>
            </span>
          );
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Birthdate",
      dataIndex: "birthdate",
      key: "birthdate",
      render: date => (
        <span>
          {moment(new Date(date)).format("MM/DD/YYYY")} (Age:{" "}
          {moment().diff(new Date(date), "years")})
        </span>
      ),
    },
    {
      title: "YWC Staff Check Status",
      dataIndex: "isPassStaff",
      key: "isPassStaff",
      render: status => (
        <span>
          <Tag color={status === true ? "green" : "geekblue"}>
            {status === true ? "Checked" : "Don't Check"}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "Checked",
          value: "true",
        },
        {
          text: "Don't Check",
          value: "undefined",
        },
      ],
      onFilter: (value, record) => value === `${record.isPassStaff}`,
    },
    {
      title: "Grading Status",
      dataIndex: "failed",
      key: "failed",
      render: failed => (
        <span>
          <Tag color={failed === true ? "red" : "purple"}>
            {failed === true ? "Failed" : "In System"}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "Failed",
          value: "true",
        },
        {
          text: "In System",
          value: "undefined",
        },
      ],
      onFilter: (value, record) => value === `${record.failed}`,
    },
    {
      title: "Committee Score",
      dataIndex: "committeeScore",
      key: "committeeScore",
      render: score => <span>{score || 0}</span>,
      sorter: (a, b) => (a.committeeScore || 0) - (b.committeeScore || 0),
    },
    {
      title: "Action",
      key: "action",
      render: data => (
        <Button onClick={() => this.viewCandidateDetail(data._id)}>
          <Icon type="edit" theme="outlined" /> ดูรายละเอียเพิ่มเติม
        </Button>
      ),
      width: 200,
      fixed: "right",
    },
  ];

  viewCandidateDetail = async id => {
    const response = await fetchWithToken(`users/profile/${id}`, {}, "GET");

    if (response.status === "success") {
      this.candidateData = response.payload;
      this.showCandidateModal = true;
    }
  };

  closeModal = () => {
    this.showCandidateModal = false;
  };

  onPageChange = pagination => {
    PaginationStore.currentPage = pagination.current;
    this.pagination = {current: pagination.current};
  };

  render() {
    return (
      <Fragment>
        <Padding>Hello world</Padding>

        <CandidateModal
          showCandidateModal={this.showCandidateModal}
          closeModal={this.closeModal}
          candidate={this.candidateData}
        />

        <Table
          columns={this.columns}
          scroll={{x: 2500}}
          dataSource={this.candidates}
          onChange={this.onPageChange}
          pagination={this.pagination}
        />
      </Fragment>
    );
  }
}
