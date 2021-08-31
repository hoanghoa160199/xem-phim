import { Form, Input, Button } from 'antd';
import axios from 'axios';

const Register = () => {
    const onFinish = (values) => {
        return axios.post()
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ marginTop: '100px', marginLeft: '30%' }}
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    style={{ width: "400px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    style={{ width: "400px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ width: "400px" }}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
