import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteDoctorComponent = ({_id, setUpdate}) => {

    const showModalDelete = (id) => {
        console.log(id)
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
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
            <a className='delete-color' onClick={(e) => showModalDelete(_id)}>Eliminar</a>
        </div>
    );
}

export default DeleteDoctorComponent;