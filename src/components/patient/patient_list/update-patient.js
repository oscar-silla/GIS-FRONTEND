import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import FormUpdateComponent from './form-update';
import axios from 'axios';

const UpdatePatientComponent = ({ name, surnames, isModalVisible, setIsModalVisible, id, setUpdated }) => {

    const handleOk = (values) => {
        setIsModalVisible(false);
        axios.put(`http://localhost:4000/patients/update/${id}`, values)
            .then(res => {
                setUpdated(true)
                console.log(res)
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div>

            <Modal title={name + " " + surnames}
                visible={isModalVisible}
                onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button form="updatePatientForm" key="submit" htmlType="submit">
                        Aceptar
                    </Button>
                ]}>
                <FormUpdateComponent onOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdatePatientComponent;