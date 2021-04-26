import React from 'react';
import { Button, Modal } from 'antd';
import FormCreateDocumentComponent from './form-create-document';
import axios from 'axios';

const CreateDocumentComponent = ({isModalCreateVisible, setIsModalCreateVisible, setUpdated}) => {

    const handleOk = (values) => {
        axios.post('http://localhost:4000/documents/create', values)
                .then(res => {
                    console.log(res);
                    setUpdated(true)
                })
        setIsModalCreateVisible(false);
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };
    return (
        <div>
            <Modal title="Crear Documento" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-document' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormCreateDocumentComponent handleOk={handleOk}/>
            </Modal>
        </div>
    );
}

export default CreateDocumentComponent;
