import React, {Component, Fragment} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Layout, Menu, Icon} from "antd";

import Panel from "../ui/Panel";

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
  margin: 20px 0;
  text-align: center;
`;

class Menubar extends Component {
  render() {
    const {menus, header, children} = this.props;

    return (
      <Fragment>
        <Layout>
          <SideSlider>
            <Logo />

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {menus.map((menu, i) => {
                return (
                  <Menu.Item key={i + 1}>
                    <Icon type={menu.icon} />
                    <span className="nav-text">{menu.name}</span>
                  </Menu.Item>
                );
              })}
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

export default Menubar;
