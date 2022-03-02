import React from 'react'
import { Modal, Form, Select, Spin, Avatar } from 'antd'
import { AppContext } from '../../../context/AppProvider'
import debounce from 'lodash.debounce'
import axios from '../../../configs/AxiosService'

const DebounceSelect = ({ fetchFunc, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([])
      setFetching(true)

      fetchFunc(value, props.idchannelselected).then(newOptions => {
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchFunc])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {
        options.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
            title={option.label}
          >
            <Avatar className="avatar" size='small' src={option.avatar}>
              {option.avatar ? '' : option.label?.charAt(0).toUpperCase()}
            </Avatar>
            {option.label} ({option.email})
          </Select.Option>
        ))
      }
    </Select>
  )
}

const fetchUsersToInvite = async (keyword, idChannelSelected) => {
  const users = await axios.get(`/channels/${idChannelSelected}/members-invite`, {
    params: {
      keyword: keyword
    }
  })

  return users.data.data.map((user) => ({
    label: user.name,
    value: user._id,
    avatar: user.avatar,
    email: user.email,
  }))
}

const InviteMemberModal = () => {
  const {
    isDisplayInviteMemberModal,
    setIsDisplayInviteMemberModal,
    channelSelected,
    idChannelSelected,
    setChannelMembers
  } = React.useContext(AppContext)

  const [value, setValue] = React.useState([])

  const [form] = Form.useForm()

  const handleOk = async () => {
    setIsDisplayInviteMemberModal(false)

    form.resetFields()
    setValue([])

    // Add members for channel
    const membersId = value.map((value) => value.value)

    await axios.post(`/channels/${idChannelSelected}/members`, {
      members: membersId
    }).then((res) => {
      setChannelMembers(res.data.data)
    })
  }

  const handleCancel = () => {
    setIsDisplayInviteMemberModal(false)
    form.resetFields()
    setValue([])
  }

  return (
    <>
      <Modal
        title="Invite Member"
        visible={isDisplayInviteMemberModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout='vertical'
        >
          <DebounceSelect
            placeholder="Search for members"
            mode='multiple'
            style={{ width: '100%' }}
            label='Name of member'
            value={value}
            fetchFunc={fetchUsersToInvite}
            onChange={newValue => setValue(newValue)}
            currentmembers={channelSelected.members}
            idchannelselected={idChannelSelected}
          />
        </Form>
      </Modal>
    </>
  )
}

export default InviteMemberModal
