import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Divider } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdatePatientComponent from './update-patient';
import DeletePatientComponent from './delete-patient';
import CreatePatientComponent from './create-patient';

const PatientTableComponent = () => {

    const [patients, setPatients] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [patient, setPatient] = useState({
        name: '',
        surnames: '',
        id: ''
    });
    const { name, surnames, id } = patient;


    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(res => {
                const { data } = res.data;
                setPatients(data);
                setUpdated(false);
            });
        console.log(updated)
    }, [updated]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id_patient',
            key: 'id_patient'
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellidos',
            dataIndex: 'surnames',
            key: 'surnames',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className='edit-color' onClick={(e) => showModalUpdate(record._id)}>Editar</a>
                    <Link to={`/patient_detail/${record._id}`}>
                        <a className='info-color'>Información</a>
                    </Link>
                    <DeletePatientComponent setUpdated={setUpdated} id={record._id} />

                </Space>
            ),
        },
    ];

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    const showModalUpdate = (id) => {
        setIsModalUpdateVisible(true);
        axios.get(`http://localhost:4000/patients/${id}`)
            .then(res => {
                const { data } = res.data;
                setPatient({
                    name: data.name,
                    surnames: data.surnames,
                    id: id
                });
            });
    };

    return (
        <div>
            <div className='flex'>
                <h1>Patient Table</h1>
                <Button className='flex-auto' type='primary' onClick={showModalCreate}>
                    Añadir paciente
                </Button>
            </div>
            <Divider />
            <Table columns={columns} dataSource={patients} rowKey={record => record._id} />
            <UpdatePatientComponent
                id={id} name={name}
                surnames={surnames}
                setUpdated={setUpdated}
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
            />
            <CreatePatientComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
        </div>
    );
}

export default PatientTableComponent;