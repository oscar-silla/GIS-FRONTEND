import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreateLabWorkerComponent from './table-lab-workers-options/create-lab-worker';
import UpdateLabWorkerComponent from './table-lab-workers-options/update-lab-worker';
import DeleteLabWorkerComponent from './table-lab-workers-options/delete-lab-worker';

const LabWorkerTableComponent = () => {

    const [labWorkers, setLabWorkers] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/lab-workers')
            .then(result => {
                const { data } = result.data;
                setLabWorkers(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: labWorker => <img className='image' alt={labWorker.image} src={labWorker.image} />
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showUpdateModal(record._id)} >Editar</span>
                    <DeleteLabWorkerComponent currentId={record._id} setUpdated={setUpdated} />
                </Space>
            ),
        },
    ];

    const showCreateModal = () => {
        setIsModalCreateVisible(true);
    };

    const showUpdateModal = (currentId) => {
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    return (
        <div>
            <div className='flex'>
                <h1>Lista de Laboratoristas</h1>
                <Button type='primary' onClick={showCreateModal} className='flex-auto'>
                    Añadir Laboratorista
                </Button>
            </div>
            <Table dataSource={labWorkers} columns={columns} rowKey={record => record._id} />
            <CreateLabWorkerComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateLabWorkerComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default LabWorkerTableComponent;
