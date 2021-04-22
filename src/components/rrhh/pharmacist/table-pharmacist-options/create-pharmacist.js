import React from 'react';
import { Button, Modal } from 'antd';
import FormCreatePharmacistsComponent from './form-create-pharmacists';
import axios from 'axios';

const CreatePharmacistComponent = ({ isModalCreateVisible, setIsModalCreateVisible, setUpdated }) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/pharmacists/create', values)
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
                    <Button form='form-create-pharmacist' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreatePharmacistsComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default CreatePharmacistComponent;
