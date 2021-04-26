import React, { useEffect, useState } from 'react';
import { Divider, Table, Space, Button } from 'antd';
import axios from 'axios';
import UpdateDocumentComponent from './document-table-options/update-document';
import DeleteDocumentComponent from './document-table-options/delete-document';
import CreateDocumentComponent from './document-table-options/create-document';


const TableDocumentsComponent = ({ patients }) => {

    const [documents, setDocuments] = useState([]);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/documents')
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.flatMap(document => {
                    return patients.map(patient => {
                        if (patient._id === document.id_patient) {
                            return {
                                _id: document._id,
                                patient: patient.name + ' ' + patient.surnames,
                                title: document.title,
                                file: 'document.file',
                                date: document.date.split('T')[0].split('-').reverse().join('-')
                            };
                        } else {
                            return {
                                _id: 'No disponible',
                                patient: 'No disponible',
                                title: 'No disponible',
                                file: 'No disponible',
                                date: 'No disponible'
                            };
                        }
                    });
                });
                const documents_filtered = data_filtered.filter(document => document._id !== 'No disponible');
                setDocuments(documents_filtered);
                setUpdated(false);
            });
    }, [patients, updated]);

    const showModalUpdate = (currentId) => {
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    const showModalCreate = (currentId) => {
        setIsModalCreateVisible(true);
    };

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Paciente',
            dataIndex: 'patient',
            key: 'patient',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Archivo',
            dataIndex: 'file',
            key: 'file',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteDocumentComponent currentId={record._id} setUpdated={setUpdated} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className='flex'>
                <h1>Documentos de Pacientes</h1>
                <Button type='primary' onClick={showModalCreate} className='flex-auto'>
                    Añadir Documento
                </Button>
            </div>
            <Divider />
            <Table columns={columns} dataSource={documents} rowKey={record => record._id} />
            <UpdateDocumentComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                currentId={currentId}
                setUpdated={setUpdated}
            />
            <CreateDocumentComponent 
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
        </div>
    )
}

export default TableDocumentsComponent;
