import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreateMedicineCategoryComponent from './medicine-category-table-options/create-medicine-category';
import UpdateMedicineCategoryComponent from './medicine-category-table-options/update-medicine-category';
import DeleteMedicineCategoryComponent from './medicine-category-table-options/delete-medicine-category';

const MedicineCategoryTableComponent = () => {

    const [categories, setCategories] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/medicine/categories')
            .then(result => {
                const { data } = result.data;
                setCategories(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className='edit-color' onClick={(e) => showModalUpdate(record._id)}>Editar</a>
                    <DeleteMedicineCategoryComponent currentId={record._id} setUpdated={setUpdated} />
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
                <h1>Categorias de Medicamentos</h1>
                <Button type='primary' onClick={showModalCreate} className='flex-auto'>
                    Añadir Categoria
                </Button>
            </div>
            <Table columns={columns} dataSource={categories} rowKey={record => record._id} />
            <CreateMedicineCategoryComponent 
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateMedicineCategoryComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    )
}

export default MedicineCategoryTableComponent;