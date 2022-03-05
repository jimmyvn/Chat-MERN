import { Empty, Form, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import Message from './Message'
import axios from '../../configs/AxiosService'
import { io } from 'socket.io-client'

const ContentStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`

const InputMessageStyled = styled(Input.TextArea)`
  background: #002530;
  color: #c2cbd3;
  border-color: #135c6f;
  box-shadow: none;

  &:hover {
    border-color: #12586a;
    box-shadow: none;
  }

  &:focus {
    border-color: #12586a;
    box-shadow: none;
  }
`

export default function MessagesList() {

  const [form] = Form.useForm()
  const messageListRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const socket = React.useRef()
  const [arrivalMessageFromSocket, setArrivalMessageFromSocket] = React.useState(null)
  const [messages, setMessages] = React.useState([])

  const { user: {
    _id
  } } = React.useContext(AuthContext)

  const { channelSelected, idChannelSelected } = React.useContext(AppContext)

  React.useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(`/channels/${idChannelSelected}/messages`)
      if (res.status === 200) {
        setMessages(res.data.data)
      }
    }

    getMessages()
  }, [idChannelSelected])

  React.useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessageChannel', (dataMessage) => {
      console.log(dataMessage);
      setArrivalMessageFromSocket(dataMessage)
    })
  }, [])

  React.useEffect(() => {
    if (arrivalMessageFromSocket) {
      if (idChannelSelected === arrivalMessageFromSocket?.channel && _id !== arrivalMessageFromSocket?.user?._id) {
        setMessages((prevMessages) => [...prevMessages, arrivalMessageFromSocket])
      }
    }
  }, [arrivalMessageFromSocket])

  React.useEffect(() => {
    // scroll to bottom after `messages` changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50
    }
  }, [messages])

  const handleSubmitMessage = async () => {
    const formData = form.getFieldsValue()

    formData.user = _id
    formData.channel = idChannelSelected

    await axios.post(`/channel-messages`, formData)
      .then((res) => {
        socket.current.emit('sendMessageChannel', res.data.data)
        setMessages((prevMessages) => [...prevMessages, res.data.data])
      })

    form.resetFields()

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus()
      });
    }
  }

  return (
    <>
      {
        messages.length > 0 ?
          <ContentStyled ref={messageListRef}>
            {
              messages.map((message) => {
                let isBelongsToCurrentUser = false
                if (message.user._id === _id) {
                  isBelongsToCurrentUser = true
                }
                return <Message
                  key={message._id}
                  avatar={message.user.avatar}
                  name={message.user.name}
                  content={message.content}
                  createdAt={message.createdAt}
                  own={isBelongsToCurrentUser}
                />
              })
            }
          </ContentStyled>
          :
          <div className="chat-window-empty-channel">
            <Empty description="No messages has found" style={{ color: '#c2cbd3' }} />
          </div>
      }
      <Form
        form={form}
      >
        <Form.Item name="content">
          <InputMessageStyled
            ref={inputRef}
            autoComplete="off"
            className="input-message"
            placeholder="Enter message..."
            onPressEnter={handleSubmitMessage}
          />
        </Form.Item>
      </Form>
    </>
  )
}
