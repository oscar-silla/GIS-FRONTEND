import React from 'react';
import { Modal, Button } from 'antd';
import FormUpdateLabReportComponent from './form-update-lab-report';
import axios from 'axios';

const LabReportUpdateComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/laboratory/reports/update/${currentId}`, values)
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
            <Modal title="Editar Informe" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-lab-report' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateLabReportComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default LabReportUpdateComponent;