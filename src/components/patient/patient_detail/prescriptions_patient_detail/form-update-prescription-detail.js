import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};


const FormUpdatePrescriptionDetailComponent = ({prescriptions, idUser, handleOk}) => {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors/')
            .then(res => {
                const { data } = res.data;
                setDoctors(data);
            });
    },[]);

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues,
            id_prescription: prescriptions.length+1,
            id_patient: idUser,
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
                id='form-update-prescription-detail'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name='id_doctor' label="Médico">
                    <Select>
                        {
                            doctors.map(doctor => {
                                return (
                                    <Select.Option key={doctor._id} value={doctor._id}>{doctor.name + ' ' + doctor.surnames}</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item name='history' label="Prescripción">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormUpdatePrescriptionDetailComponent;
