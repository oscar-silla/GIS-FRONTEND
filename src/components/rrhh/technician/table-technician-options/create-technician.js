import React from 'react';
import { Modal, Button } from 'antd';
import FormCreateTechnicianComponent from './form-create-technician';
import axios from 'axios';

const CreateTechnicianComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/technicians/create', values)
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
            <Modal title="Basic Modal" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-technician' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateTechnicianComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateTechnicianComponent;
