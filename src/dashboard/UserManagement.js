import React, {Component} from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Input, Button, Select} from "antd";

import Label from "./Label";
import noti from "../utils/noti";
import {fetchWithToken} from "../utils/fetch";

const {Option} = Select;

@observer
class UserManagement extends Component {
  @observable
  score;
  @observable
  reservation;
  @observable
  interview;
  @observable
  finalist;

  handleChange = ({key, value}) => {
    this[key] = value;
  };

  handleSubmit = key => async () => {
    const {id} = this.props;
    const requestBody = {};

    requestBody["id"] = id;
    requestBody[key] = this[key];

    if (this[key] === undefined || this[key] === "") {
      noti("error", "Error", `${key} input must not be empty`);
      return 0;
    }

    const response = await fetchWithToken(
      "grading/manager/status",
      requestBody,
    );

    if (response.status === "success") {
      noti("success", "Success", `Update ${key} success`);
    } else {
      noti("error", "Error", response.payload.message);
    }
  };

  render() {
    return (
      <div>
        <Label title="Update Score">
          <Input
            type="number"
            placeholder="Score..."
            value={this.score}
            onChange={({target}) => (this.score = target.value)}
            style={{width: "200px", marginRight: "10px"}}
          />
          <Button
            onClick={this.handleSubmit("score")}
            style={{marginTop: "10px"}}
            type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Reservation">
          <Select
            onChange={value => this.handleChange({key: "reservation", value})}
            defaultValue=""
            style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button
            onClick={this.handleSubmit("reservation")}
            style={{marginTop: "10px"}}
            type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Pass Interview">
          <Select
            onChange={value => this.handleChange({key: "interview", value})}
            defaultValue=""
            style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button
            onClick={this.handleSubmit("interview")}
            style={{marginTop: "10px"}}
            type="primary">
            Update
          </Button>
        </Label>

        <Label title="Is Finalist">
          <Select
            onChange={value => this.handleChange({key: "finalist", value})}
            defaultValue=""
            style={{width: "200px", marginRight: "10px"}}>
            <Option value="">Please Select</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Button
            onClick={this.handleSubmit("finalist")}
            style={{marginTop: "10px"}}
            type="primary">
            Update
          </Button>
        </Label>
      </div>
    );
  }
}

export default UserManagement;
