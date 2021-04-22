import React from 'react';
import { Button, Modal } from 'antd';
import FormUpdateDocumentDetailComponent from './form-update-documents-detail';
import axios from 'axios';

const UpdateDocumentDetailComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, idUpdate }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/documents/update/${idUpdate}`, values)
                .then(res => {
                    setUpdated(true);
                });
        setIsModalUpdateVisible(false);
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };

    return (
        <div>
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                   footer={
                       <Button form='update-documents-detail' key='submit' htmlType='submit'>
                           Aceptar
                       </Button>
                   }>
                <FormUpdateDocumentDetailComponent onOk={handleOk}></FormUpdateDocumentDetailComponent>
            </Modal>
        </div>
    );
}

export default UpdateDocumentDetailComponent;