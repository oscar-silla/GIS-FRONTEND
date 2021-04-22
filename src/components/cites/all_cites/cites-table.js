import React, { useEffect, useState } from 'react'
import { Table, Space, Divider, Button } from 'antd';
import axios from 'axios';
import CreateCitesComponent from './cites_table_options/create-cites';
import UpdateCitesComponent from './cites_table_options/update-cites';
import DeleteCitesComponent from './cites_table_options/delete-cites';

const CitesTableComponent = ({ patients, doctors }) => {

    const [cites, setCites] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/cites')
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.flatMap(cite => {
                    return patients.flatMap(patient => {
                        if (patient._id === cite.id_patient) {
                            return doctors.map(doctor => {
                                if (doctor._id === cite.id_doctor) {
                                    return {
                                        _id: cite._id,
                                        id_cite: cite.id_cite,
                                        doctorName: doctor.name + ' ' + doctor.surnames,
                                        patientName: patient.name + ' ' + patient.surnames,
                                        date: cite.date.split('T')[0].split('-').reverse().join('-'),
                                        observations: cite.observations,
                                        status: cite.status
                                    }
                                } else {
                                    return {
                                        _id: 'No disponible',
                                        id_cite: 'No disponible',
                                        doctorName: 'No disponible',
                                        patientName: 'No disponible',
                                        date: 'No disponible',
                                        observations: 'No disponible',
                                        status: 'No disponible'
                                    }
                                }
                            });
                        }
                        else {
                            return {
                                _id: 'No disponible',
                                id_cite: 'No disponible',
                                doctorName: 'No disponible',
                                patientName: 'No disponible',
                                date: 'No disponible',
                                observations: 'No disponible',
                                status: 'No disponible'
                            }
                        }
                    });
                });
                const cites_filtered = data_filtered.filter(cite => cite._id != 'No disponible');
                setCites(cites_filtered);
                setUpdated(false);
            })
    }, [patients, doctors, updated]);

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    const showModalUpate = (currentId) => {
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id_cite',
            key: 'id_cite',
        },
        {
            title: 'Médico',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Paciente',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Observaciones',
            dataIndex: 'observations',
            key: 'observations',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className='edit-color' onClick={(e) => showModalUpate(record._id)}>Editar</a>
                    <DeleteCitesComponent setUpdated={setUpdated} currentId={record._id} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className='flex'>
                <h1>Lista de Citas</h1>
                <Button className='flex-auto' onClick={showModalCreate} type='primary'>
                    Añadir Cita
                </Button>
            </div>
            <Divider />
            <Table columns={columns} dataSource={cites} rowKey={record => record._id} />
            <CreateCitesComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                setUpdated={setUpdated}
            />
            <UpdateCitesComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                currentId={currentId}
                setUpdated={setUpdated}
            />
        </div>
    );
}

export default CitesTableComponent;
