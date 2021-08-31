import { Table } from 'antd';
import { Menu, Dropdown, Button, Input, Drawer, Col, Row, Select, Form } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;



const Movie = () => {
  let [data, setData] = useState([]);
  
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [records, setRecords] = useState(undefined);
  const[comments, setComment] = useState(undefined)
  const onClose = () => {
    setVisible(false)
  };
  const onDelete= (id)=>{
    return axios.post("http://127.0.0.1:8000/delete-movie", { "id": id })
      .then(response => {
        console.log(response)
      }, []);
  }
  const show = () => {
    return axios.get("http://127.0.0.1:8000/search-category",
      {
        params: {
          name_category: ""
        }
      })
      .then(response => {
        setCategory([...response.data])
        setVisible(true)
      })
  };
  const onSearch = value =>{
     return axios.get("http://127.0.0.1:8000/search-movie",
      {
        params: {
          name_movie: value
        }
      })
      .then(response => {
        response.data.map((movie) => {
          var comments = ''
          for (const com of movie['comment']) {
            comments = comments + com['content'].concat("/ ")
          }
          movie['comment'] = comments
          var categories = ''
          for (const cate of movie['categories']) {
            categories = categories + cate['name'].concat("/ ")
          }
          movie['categories'] = categories
        })
        setData(response.data)
      },[])
  };
  const showEdit = () => {
    return axios.get("http://127.0.0.1:8000/search-category",
      {
        params: {
          name_category: ""
        }
      })
      .then(response => {
        console.log(response)
        setCategory([...response.data])
        setVisible(true)
      })
  };
  const onFinish = (values) => {
    const seasons = []
    seasons.push(values.seasons)
    values.seasons = seasons
    addMovie(values)
    onClose()
  };
  const onFinishEditMovie = (values) => {
    const seasons = []
    seasons.push(values.seasons)
    values.seasons = seasons
    values['vote'] = records.vote
    if(comments){
    values['comment'] = comments[0].map(comment=> comment.id)
    }
    else{ values['comment'] = ["9d50e1c2-ba95-4d9c-8ab6-5a7e53cc9337","bc747a6a-3932-465c-b145-b4262268789b"]}
    console.log(values)
    updateMovie(values)
    onClose()
  };
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  }
  const updateMovie = record => {
    axios.post("http://127.0.0.1:8000/update-movie", record)
      .then(response => {
        console.log(response)
        setLoading(true)
      }, []);
  };
  const addMovie = value => {
    axios.post("http://127.0.0.1:8000/add-movie", value)
      .then(response => {
        console.log(response)
        setLoading(true)
      }, []);
  };
  const columns = [
    {
      title: 'Name',
      width: 100,
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'Year',
      width: 50,
      dataIndex: 'year',
      key: '2',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: '3',
      width: 50,
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: '4',
      width: 100,
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '5',
      width: 50,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: '5',
      width: 150,
    },
    {
      title: 'Edit',
      key: 'operation',
      fixed: 'right',
      width: 30,
      render: (record) => <Dropdown overlay={<Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => {
            setRecords(record)
            showEdit()
          }} >
            Edit
          </a>
        </Menu.Item>
        <Menu.Item danger>
          <a onClick={() => onDelete(record.id)}>
            Delete
          </a>
        </Menu.Item>
      </Menu>}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <UnorderedListOutlined />
        </a>
      </Dropdown>
    }
  ];
  useEffect(() => {
    if (isLoading) {
      axios
        .get("http://127.0.0.1:8000/get-all-movie")
        .then(response => {
          var comment = []
          response.data.map((movie) => {
            comment.push(movie['comment'])
            var comments = ''
            for (const com of movie['comment']) {
              comments = comments + com['content'].concat("/ ")
            }
            movie['comment'] = comments
            var categories = ''
            for (const cate of movie['categories']) {
              categories = categories + cate['name'].concat("/ ")
            }
            movie['categories'] = categories
          })
          setData(response.data)
          setLoading(false)
          setComment(comment)
        }, []);
    }
  })

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        style={{ width: '40%' }}
      />
      <Button type="primary" style={{ marginLeft: '250px', marginBottom: '25px' }} onClick={show} >Add new movie</Button>
      <Table columns={columns} dataSource={data} scroll={{ x: 1200, y: 420 }} />
      <Drawer
        title="Create a new movie"
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
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input name movie' }]}
              >
                <Input placeholder="Please enter name movie" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="seasons"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input placeholder="Please enter url movie" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="year"
                rules={[{ required: true, message: 'Please input a year' }]}
              >
                <Input placeholder=" year" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="country"
                label="country"
                rules={[{ required: true, message: 'Please input country' }]}
              >
                <Input placeholder="Please enter country" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categories"
                label="Category"
                rules={[{ required: true, message: 'Please choose the category' }]}
              >
                {category && <Select
                  placeholder="Please choose the category"
                  mode="tags"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  {category.map(c => <Select.Option key={c.id}>{c.name.toString()}</Select.Option>)}
                </Select>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: 'Please choose the image' }]}
              >
                <Input placeholder="Please enter url Image" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>


      <Drawer
        title="Edit Movie"
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
        <Form layout="vertical" hideRequiredMark onFinish={onFinishEditMovie}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input name movie' }]}
              >
                <Input placeholder="Please enter name movie" defaultValue={records ? records.name : ""} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="seasons"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input placeholder="Please enter url movie" defaultValue={records ? records.seasons : ""} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="year"
                rules={[{ required: true, message: 'Please input a year' }]}
              >
                <Input placeholder=" year" defaultValue={records ? records.year : ""} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="country"
                label="country"
                rules={[{ required: true, message: 'Please input country' }]}
              >
                <Input placeholder="Please enter country" defaultValue={records ? records.country : ""} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categories"
                label="Category"
                rules={[{ required: true, message: 'Please choose the category' }]}
              >
                {category && <Select
                  placeholder="Please choose the category"
                  mode="tags"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  {category.map(c => <Select.Option key={c.id}>{c.name.toString()}</Select.Option>)}
                </Select>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: 'Please choose the image' }]}
              >
                <Input placeholder="Please enter url Image" defaultValue={records ? records.image : ""} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" defaultValue={records ? records.description : ""} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div >
  )
}
export default Movie;