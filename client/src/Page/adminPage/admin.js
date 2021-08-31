import { Layout, Tabs } from "antd";
import React, { useState } from "react";
import User from './user';
import Category from "./categories";
import Movie from "./movie";
import'./admin.css';
const { TabPane } = Tabs;
const { Header, Content, Sider } = Layout;
const Admin = () => {
    const [key, setKey] = useState(0);
    const renderContent = (key) => {
        switch (key) {
            case "1":
                return <User />;
            case "2":
                return <Movie />;
            case "3":
                return <Category />;
            default:
                return "Nope";
        }
    };
    return (
        <Layout>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    zIndex: 1,
                    background: 'green'
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    type="line"
                    onChange={(key) => setKey(key)}
                    style={{
                        width: '100px',
                        color: 'white'
                    }}
                >
                    <TabPane tab="User" key="1" />
                    <TabPane tab="Movie" key="2" />
                    <TabPane tab="Category" key="3" />
                </Tabs>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Content className = {'content_admin'} style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div >{renderContent(key)}</div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;