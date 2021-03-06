import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const FormUpdateCitesComponent = ({ handleOk }) => {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(result => {
                const { data } = result.data;
                setPatients(data);
            });
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setDoctors(data);
            });
    }, []);

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD')
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
                id='form-update-cites'
                name="basic"
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

                <Form.Item label="Médico" name='id_doctor'>
                    <Select>
                        {
                            doctors.map(doctor => {
                                return (
                                    <Select.Option value={doctor._id} key={doctor._id}>{doctor.name + ' ' + doctor.surnames}</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>

                <div className='flex ml-98'>
                    <div>
                        <label>Fecha<span className='span-cases'>:</span></label>
                        <Form.Item name="date" {...config}>
                            <DatePicker />
                        </Form.Item>
                    </div>
                    <div className='status'>
                        <label>Estado<span className='span-cases'>:</span></label>
                        <Form.Item className='status-select' name='status'>
                            <Select>
                                <Select.Option value="Pendiente" key='todo'>Pendiente</Select.Option>
                                <Select.Option value="Realizada" key='done'>Realizada</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item name='observations' label="Observaciones">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormUpdateCitesComponent;
