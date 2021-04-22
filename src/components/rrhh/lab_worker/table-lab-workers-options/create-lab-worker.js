import React from 'react';
import { Modal, Button } from 'antd';
import FormCreateLabWorkerComponent from './form-create-lab-worker';
import axios from 'axios';


const CreateLabWorkerComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/lab-workers/create', values)
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
            <Modal title="Crear Laboratorista" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-lab-worker' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateLabWorkerComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateLabWorkerComponent;
