import React from 'react';
import { Button, Modal } from 'antd';
import FormCreateFarmacyComponent from './form-create-farmacy';
import axios from 'axios';

export const CreateFarmacyComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/farmacies/create', values)
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                })
        setIsModalCreateVisible(false);
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };

    return (
        <div>
            <Modal title="Añadir Farmacéutica" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-farmacy' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateFarmacyComponent handleOk={handleOk} />
            </Modal>
        </div>
    )
}
