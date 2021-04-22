import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, DatePicker, Select, Upload, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from 'react-router';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 3, span: 0 },
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


const FormUpdateComponent = ({ onOk }) => {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(res => {
                const { data } = res.data;
                setDoctors(data);
            });
    }, []);

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'born': fieldsValue['born'].format('YYYY-MM-DD')
        };
        console.log(values)
        onOk(values);   
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                id="updatePatientForm"
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellidos"
                    name="surnames"
                    
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    
                >
                    <Input />
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
                    
                >
                    <Input />
                </Form.Item>

                <Form.Item name="sex"
                    label="Sexo"
                    >
                    <Radio.Group>
                        <Radio value="male">Hombre</Radio>
                        <Radio value="female">Mujer</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="born"
                    label="Nacimiento" {...config}
                   >
                    <DatePicker />
                </Form.Item>

                <Form.Item label="G. Sanguíneo"
                    name='blood_type'
                    >
                    <Select>
                        <Select.Option value="A+">A+</Select.Option>
                        <Select.Option value="B+">B+</Select.Option>
                        <Select.Option value="AB+">AB+</Select.Option>
                        <Select.Option value="0+">0+</Select.Option>
                        <Select.Option value="A-">A-</Select.Option>
                        <Select.Option value="B-">B-</Select.Option>
                        <Select.Option value="AB-">AB-</Select.Option>
                        <Select.Option value="0-">0-</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Médico"
                    name='doctor'
                    >
                    <Select>
                        {
                            doctors.map(doctor => {
                                return (
                                    <Select.Option key={doctor._id} value={doctor._id}>{doctor.name + " " + doctor.surnames}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="Imagen">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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

export default FormUpdateComponent;