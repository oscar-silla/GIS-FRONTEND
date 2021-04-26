import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreatePharmacistComponent from './table-pharmacist-options/create-pharmacist';
import UpdatePharmacistComponent from './table-pharmacist-options/update-pharmacist';
import DeletePharmacistComponent from './table-pharmacist-options/delete-pharmacist';

const PharmacistTableComponent = () => {

    const [doctors, setDoctors] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/pharmacists')
            .then(res => {
                const { data } = res.data;
                setDoctors(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: pharmacist => <img className='image' alt={pharmacist.image} src={pharmacist.image} />
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
                    <DeletePharmacistComponent currentId={record._id} setUpdated={setUpdated} />
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
                <h1>Lista de Farmacéuticos</h1>
                <Button type='primary' onClick={showModalCreate} className='flex-auto'>
                    Añadir Farmacéutico
                </Button>
            </div>
            <Table columns={columns} dataSource={doctors} rowKey={record => record._id} />
            <CreatePharmacistComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdatePharmacistComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default PharmacistTableComponent;
