import React from 'react';
import { Modal, Button } from 'antd';
import FormUpdateDoctorComponent from './form-update-doctor';
import axios from 'axios';

const UpdateDoctorComponent = ({ name, surnames, isModalVisible, setIsModalVisible, id, setUpdated }) => {

    const handleOkUpdate = (values) => {
        setIsModalVisible(false);
        axios.put(`http://localhost:4000/doctors/update/${id}`, values)
            .then(result => {
                setUpdated(true);
            })
    };

    const handleCancelUpdate = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <Modal title={`${name + " " + surnames}`} visible={isModalVisible} onOk={handleOkUpdate} onCancel={handleCancelUpdate}
                footer={
                    <Button form="form-update-doctor" key="submit" htmlType="submit">
                        Aceptar
                    </Button>
                }>
                <FormUpdateDoctorComponent onOk={handleOkUpdate} />
            </Modal>
        </div>
    )
}

export default UpdateDoctorComponent;