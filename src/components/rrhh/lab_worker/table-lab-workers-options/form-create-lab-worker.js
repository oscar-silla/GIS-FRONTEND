import React, { useEffect, useState } from 'react';
import { Form, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const FormCreateLabWorkerComponent = ({ handleOk }) => {
    const [labWorkers, setLabWorkers] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/lab-workers')
            .then(result => {
                const { data } = result.data;
                console.log(data)
                setLabWorkers(data);
            });
    }, []);

    const onFinish = (fieldValues) => {
        const image = fileList.find(file => file.thumbUrl);
        const values = {
            ...fieldValues,
            'image': image.thumbUrl,
            'id_labWorker': labWorkers.length + 1
        }
        handleOk(values)
    };

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
                id='form-create-lab-worker'
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
    );
}

export default FormCreateLabWorkerComponent;
