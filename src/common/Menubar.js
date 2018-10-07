import React, {Component, Fragment} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Redirect} from "react-router";
import {Layout, Menu, Icon} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Panel from "../ui/Panel";
import {userLogout} from "../login/reducer";

const {Sider} = Layout;

const SideSlider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  margin: 20px 0;
  background: url(/logo.svg) center center no-repeat;
  background-size: 70% auto;
`;

const Heading = styled.h1`
  padding: 0;
  color: #333;
  font-size: 25px;
  font-family: "Kanit";

  margin-bottom: 30px;
`;

const ContentLayout = styled.div`
  position: absolute;
  width: calc(100vw - 200px);
  left: 200px;
  padding: 20px;
`;

const Footer = styled.div`
  color: #777;
  font-size: 14px;
  width: 100%;
  margin: 30px 0;
  text-align: center;
`;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLogout()),
});

@connect(
  null,
  mapDispatchToProps,
)
export default class Menubar extends Component {
  state = {
    redirect: false,
  };

  handleLogout = () => {
    this.props.logout();
    this.setState({redirect: true});
  };

  render() {
    const {menus, header, children} = this.props;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Layout>
          <SideSlider>
            <Logo />

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {menus.map((menu, i) => {
                return (
                  <Menu.Item key={i + 1}>
                    <Link to={menu.to}>
                      <Icon type={menu.icon} />
                      <span className="nav-text">{menu.name}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
              <Menu.Item onClick={this.handleLogout} key="logout">
                <Icon type="lock" />
                <span className="nav-text">ออกจากระบบ</span>
              </Menu.Item>
            </Menu>
          </SideSlider>

          <ContentLayout>
            <Heading>{header}</Heading>
            <Panel>{children}</Panel>

            <Footer>YWC Grading System @2018 Created by Chun Rapeepat</Footer>
          </ContentLayout>
        </Layout>
      </Fragment>
    );
  }
}

Menubar.propTypes = {
  children: PropTypes.element.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.string.isRequired,
};
