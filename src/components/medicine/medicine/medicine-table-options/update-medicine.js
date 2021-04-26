import React from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import { FormUpdateMedicineComponent } from './form-update-medicine';

const UpdateMedicineComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/medicines/update/${currentId}`, values)
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
            <Modal title="Editar Medicamento" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-medicine' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateMedicineComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateMedicineComponent;
