import React from 'react'
import { Col } from 'antd'
import Sidebar from '../Sidebar'
import ChatWindow from '../ChatWindow'
import { AuthContext } from '../../context/AuthProvider'
import { io } from 'socket.io-client'
import { AppContext } from '../../context/AppProvider'

export default function ChatRoomContent() {
  const socket = React.useRef()

  const { user: { _id } } = React.useContext(AuthContext)

  React.useEffect(() => {
    socket.current = io('ws://localhost:8900')
  }, [])

  React.useEffect(() => {
    if (_id !== undefined) {
      socket.current.emit('userAccessPage', _id)
    }
  }, [_id])

  return (
    <>
      <Col className="sidebar" span={5}>
        <Sidebar />
      </Col>
      <Col className="chat-window-content" span={19}>
        <ChatWindow />
      </Col>
    </>
  )
}
