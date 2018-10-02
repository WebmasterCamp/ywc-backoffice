import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {Table, Icon, Button, Tag} from "antd";

import Menubar from "../common/Menubar";

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
    render: text => (
      <Button>
        <Icon type="check-circle" theme="outlined" /> ตรวจคำถามกลาง
      </Button>
    ),
  },
];

const data = [
  {
    key: "1",
    id: "John Brown",
    status: ["nice", "developer"],
  },
  {
    key: "2",
    id: "Jim Green",
    status: ["nice", "developer"],
  },
  {
    key: "3",
    id: "Joe Black",
    status: ["cool", "teacher"],
  },
];

class Staff extends Component {
  render() {
    return (
      <Fragment>
        <Menubar
          header="คัดคนเข้าสมัครสาขา Programming"
          menus={[{icon: "user", name: "คัดคนเข้าสมัคร"}]}>
          <Padding>
            <Stat>คนสมัครทั้งหมด 300 คน, ตรวจแล้ว 50 คน (33%)</Stat>
          </Padding>

          <Table columns={columns} dataSource={data} />
        </Menubar>
      </Fragment>
    );
  }
}

export default Staff;
