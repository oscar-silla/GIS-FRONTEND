import React, { useState, useEffect } from 'react';
import { Form, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const FormCreateDoctorComponent = ({ handleOk }) => {

    const [doctors, setDoctors] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setDoctors(data);
            });
    }, []);

    const onFinish = (fieldValues) => {
        const image = fileList.find(file => file.thumbUrl);
        const values = {
            'id_doctor': doctors.length + 1,
            ...fieldValues,
            'image': image.thumbUrl
        }
        handleOk(values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <div>
            <Form
                {...layout}
                id='form-create-doctor'
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

                <Form.Item label="Imagen">
                    <Form.Item>
                        <ImgCrop rotate>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}

                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormCreateDoctorComponent;