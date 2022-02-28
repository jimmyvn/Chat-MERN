import React from 'react'
import { Form, Input, Row, Col, Typography, Button } from 'antd'
import styled from 'styled-components'
import axios from '../../configs/AxiosService'
import { AuthContext } from '../../context/AuthProvider'

const { Title } = Typography

const RowStyled = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle, rgba(116,116,116,1) 0%, rgba(23,102,122,1) 0%, rgba(0,40,50,1) 100%);
`

const Login = () => {
  const { setUser } = React.useContext(AuthContext)
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        '/auth/login',
        {
          email: values.email,
          password: values.password,
        }
      )
      if (res.data.success == true) {
        // save user information to sessionStorage
        localStorage.setItem('user', JSON.stringify(res.data.data))
        setUser(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <>
      <RowStyled>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={2}>
            Login
          </Title>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </RowStyled>
    </>
  )
}

export default Login
