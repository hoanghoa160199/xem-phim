
import './loginAdmin.css';
import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginAdmin = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="login-form-admin"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                className="login-form-username-admin"
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                className="login-form-password-admin"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item className='login-form-button'>
                <Button type="primary" htmlType="submit" className="form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};
export default LoginAdmin;