import { Icon, Layout, Menu } from 'antd'
import React, {  Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Panel from '../ui/Panel'
import history from '../utils/history'

import LogoSVG from '../assets/logo.white.svg'

const { Sider } = Layout

const SideSlider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`

const Logo = styled.img`
  width: 100%;
  height: 80px;
  padding: 0 1em;
  margin: 1em 0;
`

const Heading = styled.h1`
  padding: 0;
  color: #333;
  font-size: 25px;
  font-family: 'Kanit';
  margin-bottom: 30px;
`

const ContentLayout = styled.div`
  position: absolute;
  width: calc(100vw - 200px);
  left: 200px;
  padding: 20px;
`

const Footer = styled.div`
  color: #777;
  font-size: 14px;
  width: 100%;
  margin: 30px 0;
  text-align: center;
`

interface MenuItem {
  icon: string
  name: string
  to: string
}

interface MenuBarProps {
  children: React.ReactChildren | any
  menus: MenuItem[]
  header: string
}

const MenuBar = (props: MenuBarProps) => {
  // public state = {
  //   redirect: false
  // }

  const handleLogout = () => {
    history.push('/')
  }

  const { menus, header, children } = props

  return (
    <Fragment>
      <Layout>
        <SideSlider>
          <Logo src={LogoSVG} />

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {menus.map((menu, i) => {
              return (
                <Menu.Item key={i + 1}>
                  <Link to={menu.to}>
                    <Icon type={menu.icon} />
                    <span className="nav-text">{menu.name}</span>
                  </Link>
                </Menu.Item>
              )
            })}
            <Menu.Item onClick={handleLogout} key="logout">
              <Icon type="lock" />
              <span className="nav-text">ออกจากระบบ</span>
            </Menu.Item>
          </Menu>
        </SideSlider>

        <ContentLayout>
          <Heading>{header}</Heading>
          <Panel>{children}</Panel>

          <Footer>
            YWC Grading System @2019 Created by Wiput Pootong, Chun Rapeepat
          </Footer>
        </ContentLayout>
      </Layout>
    </Fragment>
  )
}

export default MenuBar
