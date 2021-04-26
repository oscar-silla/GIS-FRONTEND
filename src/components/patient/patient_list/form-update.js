import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, DatePicker, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const FormUpdateComponent = ({ onOk }) => {

    const [doctors, setDoctors] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(res => {
                const { data } = res.data;
                setDoctors(data);
            });
    }, []);

    const onFinish = (fieldsValue) => {
        const image = fileList.find(file => file.thumbUrl);
        const values = {
            ...fieldsValue,
            'born': fieldsValue['born'].format('YYYY-MM-DD'),
            'image': image.thumbUrl
        };
        console.log(values)
        onOk(values);   
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

export default FormUpdateComponent;