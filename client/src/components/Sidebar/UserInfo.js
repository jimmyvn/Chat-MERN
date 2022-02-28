import React from 'react'
import { Avatar, Button, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'
import { AppContext } from '../../context/AppProvider'

const WrapperUserInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #424242;

  .username {
    color: #fff;
    margin-left: 5px;
  }
`

export default function UserInfo() {
  const { user, setUser } = React.useContext(AuthContext)

  const { clearState } = React.useContext(AppContext);

  const handleSigOut = () => {
    clearState()
    // handle logout
    localStorage.removeItem('user')
    setUser({})
  }

  return (
    <WrapperUserInfoStyled>
      <div className="user__information">
        <Avatar className="avatar" src={user.avatar ? user.avatar : ''}>
          {user.avatar ? '' : user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{user.name}</Typography.Text>
      </div>
      <Button
        type='ghost'
        style={{ color: '#fff' }}
        onClick={handleSigOut}
        icon={<LogoutOutlined />}
      >
        Sign Out
      </Button>
    </WrapperUserInfoStyled >
  )
}
