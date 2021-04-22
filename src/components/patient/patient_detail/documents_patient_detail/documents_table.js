import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreateDocumentDetailComponent from './create-documents';
import UpdateDocumentDetailComponent from './update-documents-detail';
import DeleteDocumentDetailComponent from './delete-documents-detail';

const DocumentsTableComponent = ({ idUser }) => {

    const [data, setData] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [idElement, setIdElement] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/documents/')
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.filter(r => r.id_patient === idUser);
                if (data_filtered.length > 0) {
                    setData(data_filtered);
                } else {
                    setData([]);
                }
                setUpdated(false);
            });
    }, [updated]);

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    const showModalUpdate = (id) => {
        setIsModalUpdateVisible(true);
        setIdElement(id);
    };

    const columns = [
        {
            title: 'Nº',
            dataIndex: 'id_document',
            key: 'id_document',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className='info-color'>Visualizar</a>
                    <a className='edit-color' onClick={(e) => showModalUpdate(record._id)}>Editar</a>
                    <DeleteDocumentDetailComponent id={record._id} setUpdated={setUpdated}></DeleteDocumentDetailComponent>
                </Space>
            ),
        }
    ];

    return (
        <div className='table-cases-detail'>
            <div className='flex'>
                <h2>Documentos</h2>
                <Button className='flex-auto' onClick={showModalCreate} type='primary'>
                    Añadir Documento
                </Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey={record => record._id} />
            <CreateDocumentDetailComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                idUser={idUser}
                setUpdated={setUpdated}>
            </CreateDocumentDetailComponent>
            <UpdateDocumentDetailComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                idUpdate={idElement}
                setUpdated={setUpdated}
                >
            </UpdateDocumentDetailComponent>
        </div>
    )
}

export default DocumentsTableComponent;