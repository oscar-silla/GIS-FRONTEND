import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeletePatientComponent = ({ id, setUpdated }) => {

    const [cases, setCases] = useState([]);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/cases/')
            .then(res => {
                const { data } = res.data;
                setCases(data);
            });
        axios.get('http://localhost:4000/documents/')
            .then(res => {
                const { data } = res.data;
                setDocuments(data);
            })
    }, [])

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar a este paciente?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                cases.map(patientCase => {
                    if (patientCase.id_patient === id) {
                        axios.delete(`http://localhost:4000/cases/delete/${patientCase._id}`)
                            .then(res => {
                                console.log(res)
                            });
                    }
                });
                documents.map(document => {
                    if (document.id_patient === id) {
                        axios.delete(`http://localhost:4000/cases/delete/${document._id}`)
                            .then(res => {
                                console.log(res)
                            });
                    }
                });
                axios.delete(`http://localhost:4000/patients/delete/${id}`)
                    .then(res => {
                        setUpdated(true);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div>
            <span onClick={showConfirm} className='delete-color option'>Eliminar</span>
        </div>
    )
}

export default DeletePatientComponent;