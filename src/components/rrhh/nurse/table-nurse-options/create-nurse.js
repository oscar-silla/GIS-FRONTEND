import React from 'react';
import { Button, Modal } from 'antd';
import FormCreateNurseComponent from './form-create-nurse';
import axios from 'axios';

const CreateNurseComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/nurses/create', values)
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
            <Modal title="Crear Enfermera" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
            footer={
                <Button form='form-create-nurse' key='submit' htmlType='submit'>
                    Aceptar
                </Button>
            }>
                <FormCreateNurseComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateNurseComponent;
