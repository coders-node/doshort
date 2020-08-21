import React, { useState } from "react";
import Helmet from "react-helmet";
import { Button } from "../../components";
import socket from "../../socket";
import {Link} from "react-router-dom";
import { Redirect } from "react-router";

import "./Register.scss";
import {Form, Input, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Register = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [red, setRed] = useState('no');

    const reg = async() => {
        message.loading('Попытка регистрации', 1.5)
        socket.emit('register', {username:login,password:pass}, (data) => {if(!data.success) {message.error(data.message);return};message.success('Успешная регистрация', 3);setRed( `/dashboard?tkn=${data.token}`);})
    }

    if(red !== 'no') {
        return (
            <Redirect to={red} />
        )
    }

    return (
        <>
            <Helmet>
                <title>Register - ShortUrl</title>
            </Helmet>
            <div className="authContainer">
                <div className="authText">
                    <h2>Регистрация</h2>
                    <div className="authForm">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={reg}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Введите логин!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" onChange={event=>setLogin(event.target.value)}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Введите пароль!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Пароль"
                                    onChange={event=>setPass(event.target.value)}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Зарегестрироватся
                                </Button><br/>
                                Уже зарегестрированны? <Link to="/">Войти!</Link>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;