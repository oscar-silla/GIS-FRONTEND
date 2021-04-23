import React, { useEffect, useState } from 'react';
import { Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const FormUpdateTechnicianComponent = ({ handleOk }) => {

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues
        }
        handleOk(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                id='form-update-technician'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce un nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email', message: 'Introduce un email de contacto!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Introduce una contraseña!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                >
                    <Input />
                </Form.Item>

                <Form.Item name='phone' label="Teléfono">
                    <Input />
                </Form.Item>

                <Form.Item label="Imagen">
                    <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormUpdateTechnicianComponent;
