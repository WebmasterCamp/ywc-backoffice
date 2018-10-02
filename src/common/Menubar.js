import React, {Component, Fragment} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Layout, Menu, Icon} from "antd";

const {Header, Content, Footer, Sider} = Layout;

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

const Heading = styled(Header)`
  padding: 0;
  color: #333;
  font-size: 22px;
  font-family: "Kanit";

  background: white !important;
`;

const Container = styled(Content)`
  margin: 30px;
  background: white;
  border-radius: 7px;

  padding: 20px;
`;

const ContentLayout = styled.div`
  flex: 1;
  height: 300px;
  background: red;
`;

class Menubar extends Component {
  render() {
    const {menus, header} = this.props;

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

          <ContentLayout>{header}</ContentLayout>
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
