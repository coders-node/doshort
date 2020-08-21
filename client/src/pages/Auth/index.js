import React, { useState } from "react";
import Helmet from "react-helmet";
import { Button } from "../../components";
import socket from "../../socket";
import {Link} from "react-router-dom";
import { Redirect } from "react-router";


import "./Auth.scss";
import {Form, Input, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';



const Auth = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [red, setRed] = useState('no');

    const auth = async() => {
        message.loading('Попытка авторизации', 1.5).then(socket.emit('login', {username: login, password: pass}, (data) => {if(!data.success) {message.error(data.message, 3.33);return};message.success('Успешная авторизация!',4);setRed(`/dashboard?tkn=${data.token}`)}))
    }

    if(red !== 'no') {
        return (
            <Redirect to={red} />
        )
    }

    return (
        <>
            <Helmet>
                <title>Auth - ShortUrl</title>
            </Helmet>
            <div className="authContainer">
                <div className="authText">
                    <h2>Пожалуйста, войдите в аккаунт</h2>
                    <div className="authForm">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={auth}
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
                                    Войти
                                </Button><br/>
                                Или <Link to="/register">зарегестрируйтесь!</Link>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth;