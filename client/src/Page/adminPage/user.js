import { Table } from 'antd';
import { Menu, Dropdown, Button, Input,Form ,Drawer } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { Search } = Input;
const columns = [
  {
    title: 'Name',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: 'Username',
    width: 150,
    dataIndex: 'username',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    width: 150,
  },
  {
    title: 'Edit',
    key: 'operation',
    fixed: 'right',
    width: 10,
    render: () => <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <UnorderedListOutlined />
      </a>
    </Dropdown>
  }
];

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Edit
      </a>
    </Menu.Item>
    <Menu.Item danger>Delete</Menu.Item>
  </Menu>
);
const User = () => {
  let [data, setData] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const onSearch = (value) => console.log(value);
  const addCategopry = (values) => {
    axios.post("http://127.0.0.1:8000/add-user", values)
      .then(response => {
        console.log()
      });
  };
  const onClose = () => {
    setVisible(false)
  };
  const show = () => {
    setVisible(true)
  };
  const onFinish = (values) => {
    addCategopry(values)
    onClose()
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get-user", {
        params: {
          name_user: ""
        }
      }
      )
      .then(response => setData(response.data));
  }, []);
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: '40%' }}
      />
      <Button type="primary" style={{ marginLeft: '250px', marginBottom: '25px' }}>Add new user</Button>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
          </div>
        }
      >
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="UserName"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input placeholder="Please enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input placeholder="Please enter password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
export default User;