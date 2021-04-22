import React from 'react';
import { Button, Modal } from 'antd';
import FormUpdatePrescriptionDetailComponent from './form-update-prescription-detail';
import axios from 'axios';

const EditPrescriptionDetailComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, idUser, prescriptions, idCurrentPrescription, setUpdated }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/prescriptions/update/${idCurrentPrescription}`, values)
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                });
        setIsModalUpdateVisible(false);
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };

    return (
        <div>
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-prescription-detail' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdatePrescriptionDetailComponent
                    handleOk={handleOk}
                    idUser={idUser}
                    prescriptions={prescriptions}
                />
            </Modal>
        </div>
    );
}

export default EditPrescriptionDetailComponent;