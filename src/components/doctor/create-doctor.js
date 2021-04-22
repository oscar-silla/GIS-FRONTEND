import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Divider } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from 'react-router';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 3, span: 0 },
};

const CreateDoctorComponent = () => {
    
    const [state, setState] = useState({
        data: [],
        created: false
    });
    const {data, created} = state;

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setState({
                    data: data
                });
            });
    }, [])

    const onFinish = (values) => {
        const datum = {
            id_doctor: data.length+1,
            ...values
        }
        axios.post("http://localhost:4000/doctors/create", datum)
                .then(result => {
                    console.log(result);
                    setState({
                        ...state,
                        created: true
                    });
                });
    }; 

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    return (
        <div>
            {created && <Redirect to='/doctor_list'></Redirect>}
            <h1>Crear Doctor</h1>
            <Divider />
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Por favor, introduce un nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellidos"
                    name="surnames"
                    rules={[{ required: true, message: 'Por favor, introduce un apellido!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, introduce un email valido! Ejemplo: ( persona@hospital.com )', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor, introduce una contraseña!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Imagen">
                    <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <PictureOutlined />
                            </p>
                            <p className="ant-upload-text">Haz click o Arrastra una imagen</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    name="phone"
                    rules={[{ required: true, message: 'Por favor, introduce un número de teléfono!', min: 9, max: 9}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ocupación"
                    name="occupation"
                    rules={[{ required: true, message: 'Por favor, introduce una ocupación!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateDoctorComponent;