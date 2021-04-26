import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, InputNumber } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export const FormUpdateMedicineComponent = ({ handleOk }) => {

    const [categories, setCategories] = useState([]);
    const [farmacies, setFarmacies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/medicine/categories')
            .then(res => {
                const { data } = res.data;
                setCategories(data);
            });
        axios.get('http://localhost:4000/farmacies')
            .then(res => {
                const { data } = res.data;
                setFarmacies(data);
            });
    }, []);

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues,
            'expirationDate': fieldValues['expirationDate'].format('YYYY-MM-DD')
        }
        handleOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                id='form-update-medicine'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce el nombre del medicamento!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='description' label="Descripción">
                    <Input.TextArea />
                </Form.Item>

                <div className='flex ml-98'>
                    <div>
                        <label>Stock:</label>
                        <Form.Item name='stock' rules={[{ type: 'number', min: 0, max: 1000 }]}>
                            <InputNumber />
                        </Form.Item>
                    </div>
                    <div className='ml-10'>
                        <label>Precio Unitario:</label>
                        <Form.Item name='price' rules={[{ type: 'number', min: 0, max: 1000 }]}>
                            <InputNumber style={{width: '120px'}}  />
                        </Form.Item>
                    </div>
                    <div className='ml-10'>
                        <label>Fecha de Caducidad:</label>
                        <Form.Item name="expirationDate" {...config}>
                            <DatePicker />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item label="Categoria" name='category'>
                    <Select>
                        {
                            categories.map(category => {
                                return (
                                    <Select.Option value={category.name} key={category._id}>{category.name}</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="Farmacéutica" name='id_farmacy'>
                    <Select>
                        {
                            farmacies.map(farmacy => {
                                return (
                                    <Select.Option value={farmacy._id} key={farmacy._id}>{farmacy.name}</Select.Option>
                                );
                            })
                        }
                    </Select>
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
        </div >
    );
}
