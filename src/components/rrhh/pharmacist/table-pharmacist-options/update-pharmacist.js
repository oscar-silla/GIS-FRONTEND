import React from 'react';
import { Modal, Button } from 'antd';
import FormUpdatePharmacistComponent from './form-update-pharmacist';
import axios from 'axios';

const UpdatePharmacistComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/pharmacists/update/${currentId}`, values)
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
            <Modal title="Editar Farmacéutico" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-pharmacist' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdatePharmacistComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdatePharmacistComponent;
