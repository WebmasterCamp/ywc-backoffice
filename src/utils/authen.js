import React, {Component} from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";

// user on this page must be login
export const authen = role => Comp => {
  return connect(state => ({
    auth: state.auth,
  }))(
    class extends Component {
      render = () => {
        const {auth} = this.props;

        if (!auth.isAuthen) {
          return <Redirect to="/" />;
        }

        if (auth.isAuthen && auth.profile.role !== role) {
          return <Redirect to="/" />;
        }

        return <Comp />;
      };
    },
  );
};
