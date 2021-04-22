import React from 'react';
import { Button, Modal } from 'antd';
import FormCreateCitesComponent from './form-create-cites';
import axios from 'axios';

const CreateCitesComponent = ({ isModalCreateVisible ,setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/cites/create', values)
                .then(result => {
                    console.log(result);
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
                    <Button form='form-create-cites' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateCitesComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreateCitesComponent;
