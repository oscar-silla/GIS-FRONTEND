import React from 'react';
import { Modal, Button } from 'antd';
import FormCreateDoctorComponent from './form-create-doctor';
import axios from 'axios';

const CreateDoctorComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        console.log(values)
        setIsModalCreateVisible(false);
        axios.post(`http://localhost:4000/doctors/create`, values)
            .then(result => {
                setUpdated(true)
            });
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };

    return (
        <div>
            <Modal title='Crear doctor' visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form="form-create-doctor" key="submit" htmlType="submit">
                        Aceptar
                    </Button>
                }>
                <FormCreateDoctorComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateDoctorComponent;