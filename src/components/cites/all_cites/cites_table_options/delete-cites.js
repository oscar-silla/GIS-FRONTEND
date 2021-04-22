import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteCitesComponent = ({ currentId, setUpdated }) => {

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar la cita?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/cites/delete/${currentId}`)
                        .then(res => {
                            console.log(res);
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
            <a className='delete-color' onClick={showConfirm}>Borrar</a>
        </div>
    );
}

export default DeleteCitesComponent;
