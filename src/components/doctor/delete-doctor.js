import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteDoctorComponent = ({_id, setUpdate}) => {

    const showModalDelete = (id) => {
        console.log(id)
        confirm({
            title: '¿Desea elminar a este doctor?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`http://localhost:4000/doctors/delete/${id}`)
                            .then(result => {
                                console.log(result);
                                setUpdate({
                                    updated: true
                                })
                            })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div>
            <span className='delete-color option' onClick={(e) => showModalDelete(_id)}>Eliminar</span>
        </div>
    );
}

export default DeleteDoctorComponent;