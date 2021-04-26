import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteMedicineComponent = ({ currentId, setUpdated }) => {

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar el medicamento?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/medicines/delete/${currentId}`)
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

export default DeleteMedicineComponent;