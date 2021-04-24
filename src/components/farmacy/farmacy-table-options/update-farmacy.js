import React from 'react';
import { Button, Modal } from 'antd';
import FormUpdateFarmacyComponent from './form-update-farmacy';
import axios from 'axios';

export const UpdateFarmacyComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/farmacies/update/${currentId}`, values)
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
            <Modal title="Editar Farmacéutica" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-farmacy' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateFarmacyComponent handleOk={handleOk} />
            </Modal>
        </div>
    )
}
