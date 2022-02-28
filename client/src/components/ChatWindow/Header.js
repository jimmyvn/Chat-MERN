import React from 'react'
import styled from 'styled-components'
import { Avatar, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider'

const HeaderStyled = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    align-items: center;
    box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);
    -webkit-box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);
    -moz-box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);

    .channel {
      &__name {
        font-weight: bold;
      }

      &__description {
        
      }
    }

    .header {
      &__right {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
`

const MemberAvatarStyled = styled(Avatar)`
  &&& {
    &.ant-avatar-circle {
      border: 1px solid #888;
      background: #f1f1f1;
    }

    .ant-avatar-string {
      color: #4e4e4e;
    }
  }
`

export default function Header() {
  const {
    channelSelected,
    setIsDisplayInviteMemberModal,
    channelMembers
  } = React.useContext(AppContext)

  const handleClickInviteMemberToChannelButton = () => {
    setIsDisplayInviteMemberModal(true)
  }

  return (
    <>
      <HeaderStyled>
        <div className="header__left">
          <div className="channel__name">{channelSelected.title}</div>
          <div className="channel__description">{channelSelected.description}</div>
        </div>
        <div className="header__right">
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={handleClickInviteMemberToChannelButton}
          >
            Invite
          </Button>
          <Avatar.Group
            maxCount={3}
            size="large"
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {
              channelMembers.map((member) => {
                return <MemberAvatarStyled
                  key={member._id}
                  src={member.avatar}
                >
                  {member?.avatar ? '' : member.name?.charAt(0).toUpperCase()}
                </MemberAvatarStyled>
              })
            }
          </Avatar.Group>
        </div>
      </HeaderStyled>
    </>
  )
}
