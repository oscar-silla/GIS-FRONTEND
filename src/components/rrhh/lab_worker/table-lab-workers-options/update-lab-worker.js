import React from 'react';
import { Modal, Button } from 'antd';   
import axios from 'axios';
import FormUpdateLabWorkerComponent from './form-update-lab-worker';

const UpdateLabWorkerComponent = ({isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId}) => {
    const handleOk = (values) => {
        axios.put( `http://localhost:4000/lab-workers/update/${currentId}`, values)
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                }) 
        setIsModalUpdateVisible(false);
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };

    return (
        <div>
            <Modal title="Crear Laboratorista" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-lab-worker' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateLabWorkerComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}


export default UpdateLabWorkerComponent;
