import React from 'react'
import { Button, Col, Row } from 'antd'
import Sidebar from '../Sidebar'
import ChatWindow from '../ChatWindow'

const ChatRoom = () => {

  return (
    <Row>
      <Col className="sidebar" span={5}>
        <Sidebar />
      </Col>
      <Col className="chat-window-content" span={19}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
