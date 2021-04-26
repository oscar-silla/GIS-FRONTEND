import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreateMedicineComponent from './medicine-table-options/create-medicine';
import UpdateMedicineComponent from './medicine-table-options/update-medicine';
import DeleteMedicineComponent from './medicine-table-options/delete-medicine';


const MedicineTableComponent = ({ farmacies }) => {

    const [medicines, setMedicines] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [updated, setUpdated] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/medicines')
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.flatMap(medicine => {
                    const farmacy = farmacies.map(farmacy => {
                        if (farmacy._id === medicine.id_farmacy) {
                            return {
                                _id: medicine._id,
                                id_farmacy: farmacy.name,
                                name: medicine.name,
                                description: medicine.description,
                                stock: medicine.stock,
                                category: medicine.category,
                                price: medicine.price+'€',
                                image: medicine.image,
                                expirationDate: medicine.expirationDate.split('T')[0].split('-').reverse().join('-')
                            }
                        } else {
                            return {
                                _id: 'No disponible',
                                id_farmacy: 'No disponible',
                                name: medicine.name,
                                description: medicine.description,
                                stock: medicine.stock,
                                category: medicine.category,
                                price: medicine.price,
                                image: medicine.image,
                                expirationDate: 'No disponible'
                            }
                        }
                    });
                    return farmacy;
                });
                const medicines_filtered = data_filtered.filter(medicine => medicine._id !== 'No disponible');
                setMedicines(medicines_filtered);
                setUpdated(false);
            });
    }, [farmacies, updated]);



    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: medicine => <img className='image' alt={medicine.image} src={medicine.image} />
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Farmacéutica',
            dataIndex: 'id_farmacy',
            key: 'id_farmacy',
        },
        {
            title: 'Precio Unitario',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Fecha Caducidad',
            dataIndex: 'expirationDate',
            key: 'expirationDate'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteMedicineComponent currentId={record._id} setUpdated={setUpdated} />
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
                <h1>Lista de Medicamentos</h1>
                <Button className='flex-auto' onClick={showModalCreate} type='primary'>
                    Añadir Medicamento
                </Button>
            </div>
            <Table columns={columns} dataSource={medicines} rowKey={record => record._id} />
            <CreateMedicineComponent 
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateMedicineComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default MedicineTableComponent;
