import React from 'react';
import {Button, Modal} from 'antd';
import FormUpdateTechnicianComponent from './form-update-technician';
import axios from 'axios';

const UpdateTechnicianComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/technicians/update/${currentId}`, values)
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
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-technician' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateTechnicianComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateTechnicianComponent;