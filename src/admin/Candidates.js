import React, {Component, Fragment} from "react";
import styled from "styled-components";
import moment from "moment";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag, Input} from "antd";
import {Link} from "react-router-dom";

import {authen} from "../utils/authen";
import {fetchWithToken} from "../utils/fetch";
import {applyBoxShadow} from "../utils/styled-helper";

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
  };

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
          record.nickname
        }`;
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
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
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
        <Button>
          <Link params={{id: data.id}} to={`/candidates/${data._id}`}>
            <Icon type="edit" theme="outlined" /> ดูรายละเอียเพิ่มเติม
          </Link>
        </Button>
      ),
      width: 200,
      fixed: "right",
    },
  ];

  render() {
    return (
      <Fragment>
        <Padding>Hello world</Padding>

        <Table
          columns={this.columns}
          scroll={{x: 2000}}
          dataSource={this.candidates}
        />
      </Fragment>
    );
  }
}
