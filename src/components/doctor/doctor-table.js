import React, { useEffect, useState } from 'react';
import {
    Divider, Button,
    Table, Tag,
    Space
} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateDoctorComponent from './update-doctor';
import DeleteDoctorComponent from './delete-doctor';

const DoctorListComponent = () => {

    /* HOOKS */

    // List
    const [state, setState] = useState({
        data: [],
    });
    const { data } = state;

    const [doctor, setDoctor] = useState({
        name: '',
        surnames: '',
        id: ''
    });
    const { name, surnames, id } = doctor;

    const [update, setUpdate] = useState({
        updated: false
    });
    const { updated } = update;

    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setState({
                    data: data
                })
                setUpdate({
                    updated: false
                })
            });
    }, [updated]);

    /* HANDLE UPDATE 
    ***************************************/
    const showModalUpdate = (id_doctor) => {
        setModalUpdateVisible(true);
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

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id_doctor',
            key: 'id_doctor',
            render: text => <a>{text}</a>,
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
                    <a className='edit-color' onClick={(e) => showModalUpdate(record._id)}>Editar</a>
                    <DeleteDoctorComponent setUpdate={setUpdate} _id={record._id}></DeleteDoctorComponent>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className='flex'>
                <h1>Lista de Doctores</h1>
                <Link className='flex-auto' to='create_doctor'>
                    <Button className='btn' type="primary">Añadir Doctor</Button>
                </Link>
            </div>
            <Divider />

            {/* Table */}
            <Table columns={columns} dataSource={data} rowKey={record => record._id} />

            {/* Modal Update */}
            <UpdateDoctorComponent name={name} surnames={surnames} isModalVisible={modalUpdateVisible}
                setIsModalVisible={setModalUpdateVisible}
                id={id} setUpdate={setUpdate}>
            </UpdateDoctorComponent>
        </div>
    );
}

export default DoctorListComponent;