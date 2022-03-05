import { Button, Collapse, Typography } from 'antd'
import { LinkOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import AddChannelModal from './partials/AddChannelModal'
import { AppContext } from '../../context/AppProvider'

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header, p {
      padding-bottom: 5px;
      color: #fff;
      font-weight: bold;
    }

    .ant-collapse-content-box {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
`

const TypographyLinkStyled = styled(Typography.Link)`
  &&& {
    color: #fff;
    display: block;
    padding: 5px;
    padding-left: 40px;

    &.active {
      background-color: #313131;
    }

    &:hover {
      background-color: #313131;
    }
  }
`

const AddChannelButtonStyled = styled(Button)`
  color: #fff !important;
  transition: all .3s !important;
  width: 100%;
  text-align: left;
  border-radius: 0;
  padding-left: 40px;

  &:hover {
    color: #ddd;
    background-color: #313131;
  }
`

export default function RoomList() {

  const {
    channels,
    setIsDisplayAddChannelModal,
    idChannelSelected,
    setIdChannelSelected
  } = React.useContext(AppContext)

  return (
    <>
      <Collapse ghost defaultActiveKey={['rooms-list']}>
        <PanelStyled header="Channels" key="rooms-list">
          {
            channels.map((channel) => {
              return <TypographyLinkStyled
                key={channel._id}
                className={idChannelSelected === channel._id ? 'active' : ''}
                onClick={() => {
                  console.log(`Switched to channel: ${channel._id}`);
                  setIdChannelSelected(channel._id)
                }}
              >
                <LinkOutlined style={{ marginRight: '5px' }} />
                {channel.title}
              </TypographyLinkStyled>
            })
          }
        </PanelStyled>
      </Collapse>

      <AddChannelButtonStyled
        type='text'
        icon={<PlusOutlined />}
        onClick={() => setIsDisplayAddChannelModal(true)}
      >
        Add channel
      </AddChannelButtonStyled>
      <AddChannelModal />
    </>
  )
}
