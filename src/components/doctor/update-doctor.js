import React from 'react';
import { Modal, Button } from 'antd';
import FormEditComponent from './form-update';
import axios from 'axios';

const UpdateDoctorComponent = ({ name, surnames, isModalVisible, setIsModalVisible, id, setUpdate }) => {

    const handleOkUpdate = (values) => {
        setIsModalVisible(false);
        axios.put(`http://localhost:4000/doctors/update/${id}`, values)
            .then(result => {
                setUpdate({
                    updated: true
                })
            })
    };

    const handleCancelUpdate = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <Modal title={`${name + " " + surnames}`} visible={isModalVisible} onOk={handleOkUpdate} onCancel={handleCancelUpdate}
                footer={[<Button form="myForm" key="submit" htmlType="submit">
                            Aceptar
                        </Button>]}>
                <FormEditComponent onOk={handleOkUpdate} />
            </Modal>
        </div>
    )
}

export default UpdateDoctorComponent;