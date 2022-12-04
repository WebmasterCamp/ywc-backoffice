import { Layout, Menu, MenuProps } from 'antd'
import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import Panel from '../ui/Panel'

import LogoSVG from '../assets/logo.white.svg'

import isWindows from '../utils/isWindows'
import { Padding } from '../utils/styled-helper'

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

interface ContentLayoutProps {
  collapsed: boolean
}

const ContentLayout = styled.div<ContentLayoutProps>`
  position: absolute;
  width: ${(props: ContentLayoutProps) =>
    props.collapsed
      ? `calc(100vw - ${isWindows() ? '97px' : '80px'})`
      : `calc(100vw - ${isWindows() ? '217px' : '200px'})`};
  left: ${(props: ContentLayoutProps) => (props.collapsed ? '80px' : '200px')};
  padding: 20px;
  transition: all 0.2s;
`

const Footer = styled.div`
  color: #777;
  font-size: 14px;
  width: 100%;
  margin: 30px 0;
  text-align: center;
`

type MenuItem = Required<MenuProps>['items'][number]

interface MenuBarProps {
  children: React.ReactChildren | any
  menus: MenuItem[]
  header?: string
}

const MenuBar = (props: MenuBarProps) => {
  const { menus, children } = props

  const [collapsed, setCollapsed] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Fragment>
      <Layout>
        <SideSlider
          collapsible={true}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Logo src={LogoSVG} />

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menus}
            onClick={({ key }) => navigate(key)}
          />
        </SideSlider>

        <ContentLayout collapsed={collapsed}>
          <Padding>
            <Panel>{children}</Panel>
          </Padding>

          <Footer>&copy; 2019 YWC Grading System by YWC17</Footer>
        </ContentLayout>
      </Layout>
    </Fragment>
  )
}

export default MenuBar
