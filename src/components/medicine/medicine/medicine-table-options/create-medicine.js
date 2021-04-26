import React from 'react';
import { Modal, Button } from 'antd';
import { FormCreateMedicineComponent } from './form-create-medicine';
import axios from 'axios';

const CreateMedicineComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/medicines/create', values)
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
            <Modal title="Crear Medicamento" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-medicine' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateMedicineComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateMedicineComponent;
