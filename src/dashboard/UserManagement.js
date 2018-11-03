import React, {Component} from "react";

import Label from "./Label";
import {Input, Button, Select} from "antd";

const {Option} = Select;

class UserManagement extends Component {
  render() {
    return (
      <div>
        <Label title="Update Score">
          <Input
            type="number"
            placeholder="Score..."
            style={{width: "200px", marginRight: "10px"}}
          />
          <Button style={{marginTop: "10px"}} type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Reservation">
          <Select defaultValue="" style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button style={{marginTop: "10px"}} type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Pass Interview">
          <Select defaultValue="" style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button style={{marginTop: "10px"}} type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Finalist">
          <Select defaultValue="" style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button style={{marginTop: "10px"}} type="primary">
            Update
          </Button>
        </Label>
      </div>
    );
  }
}

export default UserManagement;
