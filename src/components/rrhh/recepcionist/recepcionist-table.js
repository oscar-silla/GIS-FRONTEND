import { Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreateRecepcionistComponent from './table-recepcionist-options/create-recepcionist';
import { DeleteRecepcionistComponent } from './table-recepcionist-options/delete-recepcionist';
import UpdateRecepcionistComponent from './table-recepcionist-options/update-recepcionist';


const RecepcionistTableComponent = () => {

    const [recepcionists, setRecepcionists] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/recepcionists')
            .then(res => {
                const { data } = res.data;
                setRecepcionists(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: recepcionist => <img className='image' alt={recepcionist.image} src={recepcionist.image} />
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteRecepcionistComponent currentId={record._id} setUpdated={setUpdated} />
                </Space>
            ),
        },
    ];

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };
    const showModalUpdate = (currentId) => {
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    return (
        <div>
            <div className='flex'>
                <h1>Lista de Recepcionistas</h1>
                <Button type='primary' onClick={showModalCreate} className='flex-auto'>
                    Añadir Recepcionista
                </Button>
            </div>
            <Table columns={columns} dataSource={recepcionists} rowKey={record => record._id} />
            <CreateRecepcionistComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateRecepcionistComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default RecepcionistTableComponent;
