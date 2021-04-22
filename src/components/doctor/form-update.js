import React from 'react';
import { Form, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const FormEditComponent = ({ onOk }) => {

    const onFinish = (values) => {
        onOk(values)
    }

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
            <Form
                {...layout}
                id="myForm"
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
                    rules={[{ required: true, message: 'Por favor, introduce un número de teléfono!', min: 9, max: 9 }]}
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
            </Form>
        </div>
    );
}

export default FormEditComponent;