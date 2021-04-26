import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreateTechnicianComponent from './table-technician-options/create-technician';
import UpdateTechnicianComponent from './table-technician-options/update-technician';
import DeleteTechnicianComponent from './table-technician-options/delete-technician';

const TechnicianTableComponent = () => {

    const [technicians, setTechnicians] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/technicians')
            .then(result => {
                const { data } = result.data;
                console.log(data)
                setTechnicians(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: technician => <img className='image' alt={technician.image} src={technician.image} />
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
                    <span className='edit-color option' onClick={(e) => showUpdateModal(record._id)}>Editar</span>
                    <DeleteTechnicianComponent currentId={record._id} setUpdated={setUpdated} />
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
                <h1>Lista de Técnicos</h1>
                <Button type='primary' onClick={showCreateModal} className='flex-auto'>
                    Añadir Técnico
                </Button>
            </div>
            <Table columns={columns} dataSource={technicians} rowKey={record => record._id} />
            <CreateTechnicianComponent 
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateTechnicianComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default TechnicianTableComponent;
