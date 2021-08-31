import { Card, Col, Input, Layout, Menu, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import './home.css';

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;
const { Search } = Input;
const Home = () => {
    let [data, setData] = useState([]);
    let [dataCategory, setDataCategory] = useState([]);
    const categories = () => {
        return axios.get("http://127.0.0.1:8000/search-category", {
            params: {
                name_category: ""
            }
        }).then(response => {
            setDataCategory(response.data)
            return response.data
        }, []);
    }
    const onClickCategory = (id) => {
        console.log(id)
        return axios.get("http://127.0.0.1:8000/get-movie-category", {
            params: {
                id_category: id
            }
        }
        ).then(response => {
            setData(response.data)
        }, []);
    };
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/get-movie", {
            params: {
                name_movie: ""
            }
        }
        )
            .then(response => {
                setData(response.data)
                categories()
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
                            {dataCategory.map((category) => {
                                return <a onClick={() => onClickCategory(category.id)}> <Menu.Item style={{ height: '40px', marginTop: '-5px', background: 'black' }}>{category['name']}</Menu.Item></a>
                            })}
                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', background: 'black' }}>
                    <Search placeholder="input search text" allowClear style={{ width: 250, marginLeft: '700px', marginTop: '-40px' }} />

                    <div style={{ marginLeft: '120px', width: "75%" }}>
                        <Row gutter={28}>
                            {data.map((movie) => {
                                return <Col span={6}>
                                    <a href={`/detail-movie/${movie.id}`} className='movie_card'>
                                        <Card
                                            hoverable
                                            style={{ width: 185, height: 280 }}
                                            cover={<img style={{ width: 185, height: 230 }} alt="example" src={movie.image} />}
                                        >
                                            <Meta style={{ fontSize: '8px', marginTop: '-20px' }} title={movie['name']} />
                                        </Card>
                                    </a>
                                </Col>;
                            })}
                        </Row>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};
export default Home;