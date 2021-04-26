import { Button, Modal } from 'antd';
import axios from 'axios';
import React from 'react';
import FormUpdateCasesComponent from './form-update-cases';

const UpdateCasesComponent = ({isModalVisible, handleCancel, setIsModalVisible, patient, title, idPatient, setUpdated}) => {

    const onOk = (values) => {
        setIsModalVisible(false);
        axios.put(`http://localhost:4000/cases/update/${idPatient}`, values)
                .then(res => {
                    setUpdated(true);
                });
    }

    return (
        <div>
            <Modal title='Editar Caso' visible={isModalVisible} onOk={onOk} onCancel={handleCancel} footer={[
                <Button form="update-cases" key="submit" htmlType="submit">
                    Aceptar
                </Button>
            ]}>
                <FormUpdateCasesComponent onOk={onOk} ></FormUpdateCasesComponent>
            </Modal>
        </div>
    );
}

export default UpdateCasesComponent;