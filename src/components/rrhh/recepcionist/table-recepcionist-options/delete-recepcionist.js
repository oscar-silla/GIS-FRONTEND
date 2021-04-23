import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

export const DeleteRecepcionistComponent = ({ currentId, setUpdated }) => {

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar el recepcionista?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/recepcionists/delete/${currentId}`)
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
    )
}
