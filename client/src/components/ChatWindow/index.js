import { Empty } from 'antd'
import React from 'react'
import { AppContext } from '../../context/AppProvider'
import Header from './Header'
import MessagesList from './MessagesList'

const ChatWindow = () => {
  const { idChannelSelected } = React.useContext(AppContext)
  return (
    <>
      {
        idChannelSelected !== undefined
          ?
          <div style={{ height: '100vh' }}>
            <div className="header">
              <Header />
            </div >
            <div className="messages-list-and-form-send">
              <MessagesList />
            </div>
          </div>
          :
          <div className="chat-window-empty-channel">
            <Empty description="Please select the channel" />
          </div>
      }
    </>
  )
}

export default ChatWindow
