import React from 'react';
import { Modal, Button } from 'antd';
import FormCreateMedicineCategoryComponent from './form-create-medicine-category';
import axios from 'axios';

const CreateMedicineCategoryComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/medicine/categories/create', values)
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
        <>
            <Modal title="Crear Categoria de Medicamento" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-medicine-category' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateMedicineCategoryComponent handleOk={handleOk} />
            </Modal>
        </>
    );
}

export default CreateMedicineCategoryComponent;
