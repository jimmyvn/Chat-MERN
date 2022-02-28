import React from 'react'
import axios from '../../../configs/AxiosService'
import { Modal, Form, Input } from 'antd'
import { AppContext } from '../../../context/AppProvider'

const AddChannelModal = () => {

  const [form] = Form.useForm()

  const {
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal
  } = React.useContext(AppContext)

  const handleOk = async () => {
    setIsDisplayAddChannelModal(false)
    const formData = form.getFieldsValue()

    if (formData.title === undefined || formData.title.length === 0) {
      return
    }

    try {
      const res = await axios.post(
        '/channels',
        {
          title: formData.title,
          description: formData.description,
        }
      )
      if (res.data.success == true) {
        // Success
      }
    } catch (error) {
      console.error(error)
    }

    form.resetFields()
  }

  const handleCancel = () => {
    setIsDisplayAddChannelModal(false)
    form.resetFields()
  }

  return (
    <>
      <Modal title="Add Channel" visible={isDisplayAddChannelModal} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout='vertical' name="nest-messages">
          <Form.Item
            name={'title'}
            label="Title"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Title"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name={'description'}
            label="Description"
          >
            <Input.TextArea
              placeholder="Description"
              autoComplete="off"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddChannelModal
