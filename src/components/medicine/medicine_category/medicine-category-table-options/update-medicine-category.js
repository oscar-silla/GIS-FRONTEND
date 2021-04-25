import React from 'react';
import { Modal, Button } from 'antd';
import FormUpdateMedicineCategoryComponent from './form-update-medicine-category';
import axios from 'axios';

const UpdateMedicineCategoryComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/medicine/categories/update/${currentId}`, values)
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
            <Modal title="Editar Categoria de Medicamento" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-medicine-category' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateMedicineCategoryComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateMedicineCategoryComponent;
