import React from 'react';
import { Modal, Button } from 'antd';
import FormCreatePrescriptionDetailComponent from './form-create-prescription-detail';
import axios from 'axios';

const CreatePrescriptionDetailComponent = ({ isModalCreateVisible, setIsModalCreateVisible, idUser, prescriptions, setUpdated }) => {

    const handleOk = (values) => {
        
       axios.post('http://localhost:4000/prescriptions/create', values)
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                });
        setIsModalCreateVisible(false);
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };

    return (
        <div>
            <Modal title="Crear Prescripción" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='create-prescription-detail' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreatePrescriptionDetailComponent handleOk={handleOk} prescriptions={prescriptions} idUser={idUser} />
            </Modal>
        </div>
    );
}

export default CreatePrescriptionDetailComponent;