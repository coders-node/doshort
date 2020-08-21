import React, {useEffect, useState} from "react";
import socket from "../../socket";
import Helmet from "react-helmet";
import { Button } from "../../components";
import queryString from "query-string";
import { Link } from "react-router-dom";


import "./Dashboard.scss";
import { message, Form, Input } from "antd";


const Dashboard = () => {
    const [long, setLong] = useState('');
    const [token, setToken] = useState('');
    const [short, setShort] = useState('');
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const { tkn } = queryString.parse(window.location.search);
        console.log(tkn)
        setToken(tkn)
    },[window.location.search])

    socket.emit('allLinks', {token}, (data) => {
        if(!data.success) {return}
        setLinks(l => data.links)
    })

    const allLinks = links.map((data) =>
        <li className="allLinksItem"><h4><a href={`https://doshort.tk/${data.code}`} target="_blank" rel="noopener noreferrer">https://doshort.tk/{data.code}</a> - {data.longUri}</h4></li>
    );

    const formItemLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
    };
    const formTailLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 8, offset: 5 },
    };

    const shorturl = async() => {
        if(!long) {message.warn('Пустая ссылка.', 2.28); return}
        message.loading('Начинаю сокращать ссылку', 1.7)
        socket.emit('createLink', {token, long}, (data) => {
            if(!data.success) {message.error(data.message);return}
            setShort(`https://doshort.tk/${data.shortCode}`);
            setLong('');
            let isClone = false;
            for(let i=0;i<links.length;i++) {
                if(links[i].code === data.shortCode) {
                    isClone = true;
                    break;
                }
            }
            if(!isClone) {
                setLinks([...links, {code: data.shortCode, longUri: data.long}])
            }
            message.success('Ссылка создана успешно!',2.5)
        })
    }

    return (
        <>
            <Helmet>
                <title>DashBoard - ShortUrl</title>
            </Helmet>
            <header>
                <div className="menuText">
                    <h1>ShortMe Dashboard  |  <Link to="/">Выйти</Link></h1>
                </div>
            </header>
            <section>
                <div className="dashboard">
                    <div className="createLink">
                        <Form
                            name="createLink"
                            className="createForm"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                {...formItemLayout}
                                name="username"
                                label="Длинная ссылка"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите длинную ссылку',
                                    },
                                ]}
                            >
                                <Input placeholder="http://youtube.com/wathch?..." id="input" onChange={event=>setLong(event.target.value)}/>
                            </Form.Item>
                            <Form.Item {...formTailLayout}>
                                <Button onClick={shorturl} type="primary" size="large" className="btn-my">
                                    Создать
                                </Button>
                            </Form.Item>
                        </Form>
                        <h2 className="shortLink">Короткая ссылка: <a href={short} target="_blank" rel="noopener noreferrer">{short}</a></h2>
                    </div>
                    <hr/>
                    <div className="allLinks">
                        <h2>Все ссылки:</h2>
                        <ul className="allLinksChildren">
                            {allLinks}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;