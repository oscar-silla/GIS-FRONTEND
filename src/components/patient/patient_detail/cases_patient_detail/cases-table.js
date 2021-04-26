import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import UpdateCasesComponent from './update-cases';
import DeleteCasesComponent from './delete-cases';
import CreateCasesDetailComponent from './create-cases-detail';

const CasesTableComponent = ({ idUser }) => {

    const [cases, setCases] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [casePatient, setCasePatient] = useState({
        patient: '',
        title: '',
        idPatient: ''
    });
    const { patient, title, idPatient } = casePatient;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);


    useEffect(() => {
        console.log(idUser)
        axios.get(`http://localhost:4000/cases/`)
            .then(result => {
                const { data } = result.data;
                const data_filtered = data.filter(r => r.id_patient === idUser);
                if (data_filtered.length > 0) {
                    const patient_case = data_filtered.map(r => {
                        return {
                            _id: r._id,
                            id_case: r.id_case,
                            case: r.case,
                            date: r.date.split('T')[0].split('-').reverse().join('-'),
                            title: r.title
                        }
                    });
                    console.log(patient_case);
                    setCases(patient_case);
                } else {
                    setCases([]);
                }
                setUpdated(false);
            });
    }, [updated, idUser]);

    const showModal = (id) => {
        setIsModalVisible(true);
        axios.get(`http://localhost:4000/cases/${id}`)
            .then(result => {
                const { data } = result.data;
                setCasePatient({
                    patient: data.patient,
                    title: data.title,
                    idPatient: data._id
                });
            });
    };

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    };

    const handleCancelCreate = () => {
        setIsModalCreateVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Descripción',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span className='edit-color option' onClick={(e) => showModal(record._id)}>Editar</span>
                    <DeleteCasesComponent setUpdated={setUpdated} id={record._id} />
                </Space>
            ),
        }
    ];

    return (
        <div className='table-cases-detail'>
            <div className='flex'>
                <h2>Historial de casos</h2>
                <Button className='flex-auto' onClick={showModalCreate} type='primary'>
                    Añadir Caso
                </Button>
            </div>
            <Table columns={columns} dataSource={cases} rowKey={record => record._id} />
            <UpdateCasesComponent
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleCancel={handleCancel}
                patient={patient} title={title} idPatient={idPatient}
                setUpdated={setUpdated}>
            </UpdateCasesComponent>
            <CreateCasesDetailComponent
                isModalCreateVisible={isModalCreateVisible}
                setIsModalCreateVisible={setIsModalCreateVisible}
                handleCancelCreate={handleCancelCreate}
                idUser={idUser}
                setUpdated={setUpdated}>
            </CreateCasesDetailComponent>
        </div>
    )
}

export default CasesTableComponent;