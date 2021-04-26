import React from 'react';
import { Modal, Button } from 'antd';
import FormCreatePatientComponent from './form-create-patient';
import axios from 'axios';

const CreatePatientComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        console.log(values)
        setIsModalCreateVisible(false);
        axios.post(`http://localhost:4000/patients/create`, values)
            .then(res => {
                setUpdated(true)
                console.log(res)
            });
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };

    return (
        <div>
            <Modal title='Crear Paciente'
                visible={isModalCreateVisible}
                onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button form="form-create-patient" key="submit" htmlType="submit">
                        Aceptar
                    </Button>
                ]}>
                <FormCreatePatientComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreatePatientComponent;