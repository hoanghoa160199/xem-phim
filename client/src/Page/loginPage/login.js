
import './login.css';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import FormItem from 'antd/lib/form/FormItem';
import Home from '../homePage/home';
import Register from '../registerPage/register';
import { Route, useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const onClickLogin = () => {
        history.push('/home')
    };
    return (
        <div>
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
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
                <Button type="primary" htmlType="submit" className="form-button" onClick={onClickLogin}>
                    Log in
                </Button>
                <a href = "http://localhost:3000/register">register now!</a>
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
        </div>
    );
};
export default Login;