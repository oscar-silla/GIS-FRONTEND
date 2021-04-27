import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Divider } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 0 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};

const CreateLabReportsComponent = ({ onCreate }) => {

    const [labs, setLabs] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/laboratory/reports')
            .then(result => {
                const { data } = result.data;
                setLabs(data);
            });
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
            'id_labReport': labs.length + 1,
            'date': new Date().toISOString(),
            ...fieldValues
        }
        axios.post('http://localhost:4000/laboratory/reports/create', values)
            .then(res => {
                console.log(res);
                onCreate(true);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='width-create-cases'>
            <h1>Añadir Informe de Laboratorio</h1>
            <Divider />
            <Form
                {...layout}
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

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Crear
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateLabReportsComponent;
