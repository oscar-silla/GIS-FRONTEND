import React from 'react';
import { Modal, Button } from 'antd';
import { FormUpdateNurseComponent } from './form-update-nurse';
import axios from 'axios';

const UpdateNurseComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, currentId, setUpdated }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/nurses/update/${currentId}`, values)
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
            <Modal title="Editar Enfermera" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-nurse' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateNurseComponent handleOk={handleOk}/>
            </Modal>
        </div>
    );
}

export default UpdateNurseComponent;
