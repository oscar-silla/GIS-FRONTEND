import React, { useEffect, useState } from 'react';
import { Form, Input, Upload, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 0 },
};

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const FormCreateDocumentComponent = ({ handleOk }) => {

    const [patients, setPatients] = useState([]);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(res => {
                const { data } = res.data;
                setPatients(data);
            });
        axios.get('http://localhost:4000/documents')
            .then(res => {
                const { data } = res.data;
                setDocuments(data);
            });
    }, []);

    const onFinish = (fieldValues) => {
        const values = {
            id_document: documents.length+1,
            id_patient: fieldValues.id_patient,
            title: fieldValues.title,
            file: fieldValues.file,
            date: new Date().toISOString()
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
                name="basic"
                id='form-create-document'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Paciente" name='id_patient'>
                    <Select>
                        {
                            patients.map(patient => {
                                return (
                                    <Select.Option value={patient._id} key={patient._id}>{patient.name + ' ' + patient.surnames}</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Archivo">
                    <Form.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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

export default FormCreateDocumentComponent;
