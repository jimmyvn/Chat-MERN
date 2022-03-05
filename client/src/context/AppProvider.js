import React from 'react'
import { AuthContext } from './AuthProvider'
import axios from '../configs/AxiosService'
import { io } from 'socket.io-client'

export const AppContext = React.createContext()

export default function AppProvider({ children }) {

  const [isDisplayAddChannelModal, setIsDisplayAddChannelModal] = React.useState(false)
  const [isDisplayInviteMemberModal, setIsDisplayInviteMemberModal] = React.useState(false)
  const [idChannelSelected, setIdChannelSelected] = React.useState(undefined)
  const [channels, setChannels] = React.useState([])
  const [channelMembers, setChannelMembers] = React.useState([])
  const socket = React.useRef()

  React.useEffect(() => {
    socket.current = io('ws://localhost:8900')
  }, [])

  const { user: {
    _id
  } } = React.useContext(AuthContext)

  React.useEffect(() => {
    const getChannelsBelongTo = async (_id) => {
      if (!_id) {
        setChannels([])
        return
      }

      const res = await axios.get(`/users/${_id}/channels`)

      if (res.status === 200) {
        setChannels(res.data.data)
        socket.current.emit('userAccessPage', {
          _id: _id,
          channels: res.data.data
        })
      }
    }

    getChannelsBelongTo(_id)
  }, [_id])

  const channelSelected = React.useMemo(() => {
    return channels.find(channel => {
      return channel._id === idChannelSelected
    }) || {}
  }, [channels, idChannelSelected])

  React.useEffect(() => {
    const getChannelMembesr = async (idChannelSelected) => {
      if (!idChannelSelected) {
        setChannelMembers([])
        return
      }

      const res = await axios.get(`/channels/${idChannelSelected}/members`)

      if (res.status === 200) {
        setChannelMembers(res.data.data)
      }
    }

    getChannelMembesr(idChannelSelected)
  }, [idChannelSelected])

  const clearState = () => {
    setIdChannelSelected(undefined);
    setIsDisplayAddChannelModal(false);
    setIsDisplayInviteMemberModal(false);
  };

  return <AppContext.Provider value={{
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal,
    isDisplayInviteMemberModal,
    setIsDisplayInviteMemberModal,
    channels,
    setChannels,
    idChannelSelected,
    setIdChannelSelected,
    channelSelected,
    channelMembers,
    setChannelMembers,
    clearState
  }}>
    {children}
  </AppContext.Provider >
}
