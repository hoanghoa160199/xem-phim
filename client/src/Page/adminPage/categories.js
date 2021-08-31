import { UnorderedListOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Form, Input, Menu, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const Category = () => {
  let [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isDelete, setDelete] = useState(false)
  const [visible, setVisible] = useState(false)
  const onDelete = (id) => {
    return axios.post("http://127.0.0.1:8000/delete-category", { "id": id })
      .then(response => {
        console.log(response)
      }, []);
  };
  const addCategopry = (values) => {
    axios.post("http://127.0.0.1:8000/add-category", values)
      .then(response => {
        setLoading(true)
      });
  };
  const columns = [
    {
      title: 'Name',
      width: 300,
      dataIndex: 'name'
    },
    {
      title: 'Action',
      key: 'operation',
      width: 40,
      render: (record) => <Dropdown
        overlay={<Menu>
          <Menu.Item key="edit">
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Edit
            </a>
          </Menu.Item>
          <Menu.Item key="delete" danger>
            <a onClick={() => onDelete(record.id)}>Delete</a>
          </Menu.Item>
        </Menu>}>
        <UnorderedListOutlined />
      </Dropdown>
    }
  ];
  const onSearch = value => {
    axios.get("http://127.0.0.1:8000/search-category",
      {
        params: {
          name_category: value
        }
      })
      .then(response => {
        setData(response.data)
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
    if (isLoading) {
      axios.get("http://127.0.0.1:8000/search-category",
        {
          params: {
            name_category: ""
          }
        })
        .then(response => setData(response.data))
        .then(setLoading(false))
    }
  }, [])

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
      <Button type="primary" style={{ marginLeft: '250px', marginBottom: '25px' }} onClick={show}>Add new Category</Button>
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
            rules={[{ required: true, message: 'Please enter name category' }]}
          >
            <Input placeholder="Please enter name category" />
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
export default Category;