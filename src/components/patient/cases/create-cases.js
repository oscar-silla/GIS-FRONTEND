import React, { useEffect, useState } from 'react'
import { Form, Input, Divider, Button, DatePicker, Select } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const CreateCasesComponent = ({ createCaseCallback }) => {

    const [patients, setPatients] = useState([]);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(result => {
                const { data } = result.data;
                setPatients(data);
            });
        axios.get('http://localhost:4000/cases')
            .then(result => {
                const { data } = result.data;
                setCases(data);
            });
    }, []);

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'id_case': cases.length + 1,
            'date': fieldsValue['date'].format('YYYY-MM-DD')
        }
        axios.post('http://localhost:4000/cases/create', values)
                .then(res => {
                    createCaseCallback(true);
                });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='width-create-cases'>
            <h1>Añadir caso</h1>
            <Divider />
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='flex ml-114'>
                    <div>
                        <label><span className='star-cases'>*</span>Fecha<span className='span-cases'>:</span></label>
                        <Form.Item name="date" className='date-cases' {...config}>
                            <DatePicker />
                        </Form.Item>
                    </div>
                    <div className='ml'>
                        <label><span className='star-cases'>*</span>Paciente<span className='span-cases'>:</span></label>
                        <Form.Item className='select-cases' name='id_patient'>
                            <Select>
                                {
                                    patients.map(patient => {
                                        return (
                                            <Select.Option key={patient._id} value={patient._id}>{patient.name + ' ' + patient.surnames}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item name="title" label="Título" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='case' label="Descripción">
                    <Input.TextArea />
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

export default CreateCasesComponent;
