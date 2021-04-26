import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import FormCreateDocumentDetailComponent from './form-create-documents-detail';
import axios from 'axios';

const CreateDocumentDetailComponent = ({ isModalCreateVisible, setIsModalCreateVisible, idUser, setUpdated }) => {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/documents/')
                .then(res => {
                    const {data} = res.data;
                    setDocuments(data);
                });
    }, [])

    const handleOk = (values) => {
        const data = {
            id_document: documents.length+1,
            id_patient: idUser,
            title: values.title,
            file: values.file,
            date: new Date().toISOString()
        }
        axios.post('http://localhost:4000/documents/create', data)
                .then(res => {
                    setUpdated(true);
                });
        setIsModalCreateVisible(false);
    };

    const handleCancel = () => {
        setIsModalCreateVisible(false);
    };


    return (
        <div>
            <Modal title="Crear Documento" visible={isModalCreateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-create-documents-detail' key="submit" htmlType="submit">
                        Aceptar
                    </Button>
                }>
                <FormCreateDocumentDetailComponent onOk={handleOk}></FormCreateDocumentDetailComponent>
            </Modal>
        </div>
    );
}

export default CreateDocumentDetailComponent