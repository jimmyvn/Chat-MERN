import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { formattedDate } from '../../configs/HelperService'

const AvatarMessageItemStyled = styled(Avatar)`
  border: 1px solid #888;
  background: #f1f1f1;
`

export default function Message(props) {
  return (
    <div className={`message-item ${props.own ? 'own' : 'other'}`}>
      <div className="message-infor">
        <div className="author">
          <AvatarMessageItemStyled
            src={props.avatar}
          >
            {props.avatar ? '' : props.name?.charAt(0).toUpperCase()}
          </AvatarMessageItemStyled>
          <div className="name">
            {props.name}
          </div>
          <div className="time">
            {formattedDate(props.createdAt)}
          </div>
        </div>

      </div>
      <div className="content">
        {props.content}
      </div>
    </div>
  )
}
