import React from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import FormCreateRecepcionistComponent from './form-create-recepcionist';

const CreateRecepcionistComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/recepcionists/create', values)
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
            <Modal title="Basic Modal" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-recepcionist' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateRecepcionistComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateRecepcionistComponent;
