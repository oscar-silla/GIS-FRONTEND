import React, { useEffect, useState } from 'react';
import { Table, Space, Divider, Button } from 'antd';
import axios from 'axios';
import CreateNurseComponent from './table-nurse-options/create-nurse';
import UpdateNurseComponent from './table-nurse-options/update-nurse';
import DeleteNurseComponent from './table-nurse-options/delete-nurse';

const NurseTableComponent = () => {

    const [nurses, setNurses] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');


    useEffect(() => {
        axios.get('http://localhost:4000/nurses')
            .then(result => {
                const { data } = result.data;
                console.log(data)
                setNurses(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: nurse => <img className='image' alt={nurse.image} src={nurse.image} />
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
                    <DeleteNurseComponent currentId={record._id} setUpdated={setUpdated}/>
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
                <h1>Lista de enfermeras</h1>
                <Button type='primary' onClick={showCreateModal} className='flex-auto'>
                    Añadir enfermera
                </Button>
            </div>
            <Divider />
            <Table columns={columns} dataSource={nurses} rowKey={record => record._id} />
            <CreateNurseComponent 
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateNurseComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default NurseTableComponent;
