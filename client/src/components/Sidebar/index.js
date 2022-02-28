import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import RoomList from '../ChatRoom/RoomList'
import UserInfo from './UserInfo'

const SidebarStyled = styled.div`
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,40,50,1) 100%, rgba(68,68,68,1) 100%);
  height: 100vh;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const Sidebar = () => {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col className="rooms-list" span={24}>
          <RoomList />
        </Col>
      </Row >
    </SidebarStyled>
  )
}

export default Sidebar
