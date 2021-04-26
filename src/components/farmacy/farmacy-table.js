import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import { CreateFarmacyComponent } from './farmacy-table-options/create-farmacy';
import { UpdateFarmacyComponent } from './farmacy-table-options/update-farmacy';
import DeleteFarmacyComponent from './farmacy-table-options/delete-farmacy';


const FarmacyTableComponent = () => {

    const [farmacies, setFarmacies] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/farmacies')
            .then(result => {
                const { data } = result.data;
                setFarmacies(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
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
                    <a className='edit-color' onClick={(e) => showModalUpdate(record._id)}>Editar</a>
                    <DeleteFarmacyComponent currentId={record._id} setUpdated={setUpdated} />
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
                <h1>Lista de Farmacéuticas</h1>
                <Button className='flex-auto' onClick={showModalCreate} type='primary'>
                    Añadir Farmacéutica
                </Button>
            </div>
            <Table columns={columns} dataSource={farmacies} rowKey={record => record._id} />
            <CreateFarmacyComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateFarmacyComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default FarmacyTableComponent;
