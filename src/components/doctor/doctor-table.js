import React, { useEffect, useState } from 'react';
import {
    Divider, Button,
    Table, Tag,
    Space
} from 'antd';
import axios from 'axios';
import UpdateDoctorComponent from './update-doctor';
import DeleteDoctorComponent from './delete-doctor';
import CreateDoctorComponent from './create-doctor';

const DoctorTableComponent = () => {

    const [doctors, setDoctors] = useState([]);

    const [doctor, setDoctor] = useState({
        name: '',
        surnames: '',
        id: ''
    });
    const { name, surnames, id } = doctor;

    const [updated, setUpdated] = useState(false);

    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setDoctors(data);
                setUpdated(false);
            });
    }, [updated]);

    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            render: doctor => <img className='image' alt={doctor.image} src={doctor.image} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tags',
            key: 'ocuppation',
            render: (text, record) => (
                <>
                    {
                        <Tag color={record.occupation.length >= 8 ? 'geekblue' : 'green'} key={record.occupation}>
                            {record.occupation.toUpperCase()}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteDoctorComponent setUpdate={setUpdated} _id={record._id}></DeleteDoctorComponent>
                </Space>
            ),
        },
    ];

    /* HANDLE CREATE 
    ***************************************/
    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    /* HANDLE UPDATE 
    ***************************************/
    const showModalUpdate = (id_doctor) => {
        setIsModalUpdateVisible(true);
        axios.get(`http://localhost:4000/doctors/${id_doctor}`)
            .then(result => {
                const { data } = result.data;
                setDoctor({
                    name: data.name,
                    surnames: data.surnames,
                    id: data._id
                });
            });
    };

    return (
        <div>
            <div className='flex'>
                <h1>Lista de Doctores</h1>
                <Button className='flex-auto' type="primary" onClick={showModalCreate}>
                    Añadir Doctor
                </Button>
            </div>
            <Divider />

            {/* Table */}
            <Table columns={columns} dataSource={doctors} rowKey={record => record._id} />

            {/* Modal Update */}
            <UpdateDoctorComponent name={name} surnames={surnames} isModalVisible={isModalUpdateVisible}
                setIsModalVisible={setIsModalUpdateVisible}
                id={id} setUpdated={setUpdated} />

            <CreateDoctorComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
        </div>
    );
}

export default DoctorTableComponent;