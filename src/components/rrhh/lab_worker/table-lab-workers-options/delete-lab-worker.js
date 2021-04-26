import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteLabWorkerComponent = ({ currentId, setUpdated }) => {


    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar el laboratorista?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/lab-workers/delete/${currentId}`)
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
            <span className='delete-color option' onClick={showConfirm}>Borrar</span>
        </div>
    );
}

export default DeleteLabWorkerComponent;
