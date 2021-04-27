import React, { useEffect, useState } from 'react';
import { Table, Space, Divider } from 'antd';
import axios from 'axios';
import LabReportUpdateComponent from './lab-reports-table-options/lab-report-update';
import DeleteLabReportComponent from './lab-reports-table-options/delete-lab-report';

const LabReportsTableComponent = ({ created, setCreated, patients }) => {

    const [labs, setLabs] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [updated, setUpdated] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

    useEffect(() => {
        if (patients.length > 0) {
            axios.get('http://localhost:4000/laboratory/reports')
                .then(result => {
                    const { data } = result.data;
                    const data_filtered = data.flatMap(labReport => {
                        return patients.map(patient => {
                            if (labReport.id_patient === patient._id) {
                                return {
                                    '_id': labReport._id,
                                    'id_labReport': labReport.id_labReport,
                                    'date': labReport.date.split('T')[0].split('-').reverse().join('-'),
                                    'id_patient': patient.name + ' ' + patient.surnames,
                                    'id_doctor': labReport.id_doctor,
                                    'report': labReport.report
                                }
                            } else {
                                return {
                                    '_id': 'No disponible',
                                    'id_labReport': 'No disponible',
                                    'date': 'No disponible',
                                    'id_patient': 'No disponible',
                                    'id_doctor': 'No disponible',
                                    'report': 'No disponible'
                                }
                            }
                        });
                    });
                    const labReports_filterd = data_filtered.filter(labReport => labReport._id !== 'No disponible');
                    setLabs(labReports_filterd);
                    setCreated(false);
                    setUpdated(false);
                });
        }
    }, [created, patients, updated])

    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'id_patient',
            key: 'id_patient',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeleteLabReportComponent currentId={record._id} setUpdated={setUpdated} />
                </Space>
            ),
        },
    ];

    const showModalUpdate = (currentId) => {
        setCurrentId(currentId);
        setIsModalUpdateVisible(true);
    };

    return (
        <div className='table-cases'>
            <h1>Lista de Informes</h1>
            <Divider />
            <Table columns={columns} dataSource={labs} rowKey={record => record._id} />
            <LabReportUpdateComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                setUpdated={setUpdated}
                currentId={currentId}
            />
        </div>
    );
}

export default LabReportsTableComponent;
