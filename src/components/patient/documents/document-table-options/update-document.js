import React from 'react';
import { Button, Modal } from 'antd';
import FormUpdateDocumentComponent from './form-update-document';
import axios from 'axios';

const UpdateDocumentComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, currentId, setUpdated }) => {

    const handleOk = (values) => {
        setIsModalUpdateVisible(false);
        axios.put(`http://localhost:4000/documents/update/${currentId}`, values)
                .then(result => {
                    console.log(result);
                    setUpdated(true)
                })
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };

    return (
        <div>
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                    footer={
                        <Button form='form-update-document' key='submit' htmlType='submit'>
                            Aceptar
                        </Button>
                    }>
                <FormUpdateDocumentComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateDocumentComponent;
