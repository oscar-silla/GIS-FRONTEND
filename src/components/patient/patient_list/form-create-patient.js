import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, DatePicker, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
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

const FormCreatePatientComponent = ({ handleOk }) => {

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(res => {
                const { data } = res.data;
                setDoctors(data);
            });
        axios.get('http://localhost:4000/patients')
            .then(res => {
                const { data } = res.data;
                setPatients(data);
            });
    }, []);

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'id_patient': patients.length + 1,
            'born': fieldsValue['born'].format('YYYY-MM-DD')
        };
        handleOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                id='form-create-patient'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce el nombre del paciente!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellidos"
                    name="surnames"
                    rules={[{ required: true, message: 'Introduce los apellidos del paciente!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Introduce un email de contacto', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                    rules={[{ required: true, message: 'Introduce una dirección!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    name="phone"
                    rules={[{ required: true, message: 'Introduce un número de teléfono!', min: 0, max: 9 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="sex"
                    label="Sexo"
                    rules={[{ required: true, message: 'Escoge una opción!' }]}>
                    <Radio.Group>
                        <Radio value="male">Hombre</Radio>
                        <Radio value="female">Mujer</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="born"
                    label="Nacimiento" {...config}
                    rules={[{ required: true, message: 'Introduce la fecha de nacimiento del paciente!' }]}>
                    <DatePicker />
                </Form.Item>

                <Form.Item label="G. Sanguíneo"
                    name='blood_type'
                    rules={[{ required: true, message: 'Introduce el grupo sanguíneo del paciente!' }]}>
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
                    rules={[{ required: true, message: 'Médico del paciente!' }]}>
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

export default FormCreatePatientComponent;
