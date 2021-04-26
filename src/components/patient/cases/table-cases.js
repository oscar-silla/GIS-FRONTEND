import React, { useEffect, useState } from 'react'
import { Table, Space, Divider } from 'antd';
import axios from 'axios';
import EditCasesComponent from './table_cases_options/edit-cases';
import DeleteCasesComponent from './table_cases_options/delete-cases';


const TableCasesComponent = ({ patients, isCreated, setIsCreated }) => {

    const [cases, setCases] = useState([]);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (patients.length > 0) {
            console.log(patients.length)
            axios.get('http://localhost:4000/cases')
                .then(result => {
                    const { data } = result.data;
                    const cases_filtered = data.flatMap(patientCase => {
                        return patients.map(patient => {
                            if (patient._id === patientCase.id_patient) {
                                return {
                                    _id: patientCase._id,
                                    date: patientCase.date.split('T')[0].split('-').reverse().join('-'),
                                    name: patient.name + ' ' + patient.surnames,
                                    title: patientCase.title
                                }
                            } else {
                                return {
                                    date: 'No disponible',
                                    name: 'No disponible',
                                    title: 'No disponible'
                                }
                            }
                        });
                    });
                    const filter = cases_filtered.filter(patientCase => patientCase.name !== 'No disponible');
                    setCases(filter);
                    setUpdated(false);
                    setIsCreated(false);
                });
        }
    }, [patients, updated, isCreated]);



    const showModalUpdate = (currentId) => {
        console.log(currentId);
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Paciente',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteCasesComponent setUpdated={setUpdated} currentId={record._id} />
                </Space>
            ),
        },
    ];

    return (
        <div className='table-cases'>
            <h1>Lista de Casos</h1>
            <Divider />
            <Table columns={columns} dataSource={cases} rowKey={record => record._id} />
            <EditCasesComponent
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                currentId={currentId}
                setUpdated={setUpdated}
            />
        </div>
    )
}

export default TableCasesComponent;
