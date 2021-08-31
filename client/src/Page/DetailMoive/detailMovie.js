import { Avatar, Button, Card, Comment, Descriptions, Form, Input, Layout, List, Menu, Rate } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { FacebookShareButton, FacebookIcon } from "react-share";
import './detail.css';

const { TextArea, Search } = Input;
const { Header, Content } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <Form>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </Form>
);
const DetailMovie = ({ match }) => {
    const data_movie = [1, 2, 3, 4, 5, 6, 6, 7, 78, 9]
    const [comments, setComment] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [recommend, setRecommend] = useState([]);
    let [data, setData] = useState({ });
    let [dataCategory, setDataCategory] = useState([]);

    // useEffect(() => {
    //     console.log(match.params)
    // }, [])
    const render_category = () => {
        if (Object.keys(data).length !== 0) {
            return data['categories'].map(cat => cat.name).toString()
        }
        return ''
    }
    const categories = () => {
        return axios.get("http://127.0.0.1:8000/search-category", {
            params: {
                name_category: ""
            }
        }).then(response => {
            setDataCategory(response.data)
        }, []);
    }
    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setValue('')
            setComment([...comments, {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{value}</p>,
                datetime: moment().fromNow(),
            }])
        }, 1000);
    };

    const handleChange = e => {
        setValue(e.target.value)
    };
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/detail-movie", {
            params: {
                id_movie: match.params['id']
            }
        }
        )
            .then(response => {
                console.log(response.data)
                setRecommend(response.data.recommends)
                categories()
                setData(response.data)
            });
    }, []);
    return (
        <div className="site-card-wrapper">
            <Layout className="layout">
                <Header style={{ height: '50px', background: 'black' }}>
                    <Menu style={{ marginTop: '-10px', marginLeft: '50px', background: 'black' }} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item style={{ height: '60px', background: 'black' }} key="alipay">
                            <a href="http://localhost:3000/home" target="_blank" rel="noopener noreferrer">
                                Trang chủ
                            </a>
                        </Menu.Item>
                        <SubMenu style={{ height: '50px', background: 'black' }} key="SubMenu" title="Thể loại">
                            {dataCategory.map((category, index) => {
                                const key = index + 1
                                return <Menu.Item style={{ height: '40px', marginTop: '-5px', background: 'black' }} key={key}>{category['name']}</Menu.Item>
                            })}
                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', background: 'black' }}>
                    <div className='movie'>
                        <ReactPlayer
                            controls url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                            width='600px'
                            height='400px'
                        />
                    </div>
                    <div className='description'>
                        <Descriptions title={data['name']}>
                            <Descriptions.Item label="Chi tiết">
                                Năm: {data['year']}
                                <br />
                                Quốc gia: {data['country']}
                                <br />
                                Thể loại: {render_category()}
                                <br />
                                description: {data['description']}
                                <br />
                            </Descriptions.Item>
                        </Descriptions>
                        <FacebookShareButton>
                            <FacebookIcon size={32} /> Click me to share on Facebook
                        </FacebookShareButton>
                        <br />
                        <Rate />
                        <div>
                            <Comment
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={handleChange}
                                        onSubmit={handleSubmit}
                                        submitting={submitting}
                                        value={value}
                                    />
                                }
                            />
                            {comments.length > 0 && <CommentList comments={comments} />}
                        </div>
                    </div>
                    <div className='Recommendations'>
                        {recommend ? recommend.map((movie) => {
                            return <a className='movie_card' href={`/detail-movie/${movie.id}`} >
                                <img className='image_recomment' alt="example" src={movie.image} />
                                <p className='descrpition_recomment'>
                                    {movie.name}<br />
                                    {movie.year}<br />
                                </p>
                            </a>
                        }) : []}
                    </div>
                </Content>
            </Layout>
        </div>
    );
};
export default DetailMovie;