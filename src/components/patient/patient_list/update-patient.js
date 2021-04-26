import React from 'react';
import { Modal, Button } from 'antd';
import FormUpdateComponent from './form-update';
import axios from 'axios';

const UpdatePatientComponent = ({ name, surnames, isModalUpdateVisible, setIsModalUpdateVisible, id, setUpdated }) => {

    const handleOk = (values) => {
        setIsModalUpdateVisible(false);
        axios.put(`http://localhost:4000/patients/update/${id}`, values)
            .then(res => {
                setUpdated(true)
                console.log(res)
            });
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };


    return (
        <div>
            <Modal title={name + " " + surnames}
                visible={isModalUpdateVisible}
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