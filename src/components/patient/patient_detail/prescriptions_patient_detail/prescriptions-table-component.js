import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import CreatePrescriptionDetailComponent from './create-prescription-detail';
import EditPrescriptionDetailComponent from './edit-prescription-component';
import DeletePrescriptionsDetailComponent from './delete-prescriptions-detail';

const PrescriptionsTableComponent = ({ idUser, doctors }) => {

    const [prescriptions, setPrescriptions] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [idCurrentPrescription, setIdCurrentPrescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/prescriptions/')
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.filter(r => r.id_patient === idUser);
                if (data_filtered.length > 0) {
                    const patient_prescription = data_filtered.flatMap(prescription => {
                        const doctors_filtered = doctors.filter(doctor => doctor._id === prescription.id_doctor);
                        return doctors_filtered.map(doc => {
                            const values = {
                                _id: prescription._id,
                                date: prescription.date.split('T')[0],
                                doctor: doc.name + ' ' + doc.surnames
                            }
                            return values
                        });
                    });
                    setPrescriptions(patient_prescription);
                    setUpdated(false)
                } else {
                    setPrescriptions([]);
                }
            });
    }, [doctors, updated, idUser]);

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    const showModalUpdate = (id) => {
        setIdCurrentPrescription(id);
        setIsModalUpdateVisible(true);
    };

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Médico',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModalUpdate(record._id)}>Editar</span>
                    <DeletePrescriptionsDetailComponent currentIdPrescription={record._id} setUpdated={setUpdated}/>
                </Space>
            ),
        },
    ];

    return (
        <div className='table-cases-detail mt-12'>
            <div className='flex'>
                <h2>Prescripciones</h2>
                <Button onClick={showModalCreate} className='flex-auto' type='primary'>
                    Añadir prescripción
                </Button>
            </div>
            <Table columns={columns} dataSource={prescriptions} rowKey={record => record._id} />
            <CreatePrescriptionDetailComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                idUser={idUser}
                prescriptions={prescriptions}
                setUpdated={setUpdated}
            />
            <EditPrescriptionDetailComponent 
                isModalUpdateVisible={isModalUpdateVisible}
                setIsModalUpdateVisible={setIsModalUpdateVisible}
                idUser={idUser}
                prescriptions={prescriptions}
                idCurrentPrescription={idCurrentPrescription}
                setUpdated={setUpdated}
            />
        </div>
    );
}

export default PrescriptionsTableComponent;