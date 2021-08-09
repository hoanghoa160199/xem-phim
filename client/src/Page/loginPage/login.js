
import './login.css';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import FormItem from 'antd/lib/form/FormItem';

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                className="login-form-username"
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                className="login-form-password"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" className='remember-me'>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="adadasda">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item className='login-form-button'>
                <Button type="primary" htmlType="submit" className="form-button">
                    Log in
                </Button>
                <a href="asdasdasd" className="registor">register now!</a>
            </Form.Item>
            <Form.Item>
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login"
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Form.Item>
            <Form.Item>
                <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                // onClick={componentClicked}
                // callback={responseFacebook} 
                />
            </Form.Item>
        </Form>
    );
};
export default Login;