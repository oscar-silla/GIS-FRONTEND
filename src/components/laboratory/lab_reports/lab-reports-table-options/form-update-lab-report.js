import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 0 },
};

const FormUpdateLabReportComponent = ({ handleOk }) => {

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

    const onFinish = (fieldValues) => {
        const values = {
            'date': new Date().toISOString(),
            ...fieldValues
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
                id='form-update-lab-report'
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

                <Form.Item name='report' label="Informe">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormUpdateLabReportComponent;