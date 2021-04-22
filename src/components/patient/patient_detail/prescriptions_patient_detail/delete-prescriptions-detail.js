import React from 'react'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeletePrescriptionsDetailComponent = ({currentIdPrescription, setUpdated}) => {

    const showConfirm = () => {
        
        confirm({
            title: '¿Desea eliminar la prescripción?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                console.log('OK');
                axios.delete(`http://localhost:4000/prescriptions/delete/${currentIdPrescription}`)
                        .then(res => {
                            console.log(res);
                            setUpdated(true);
                        })
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

export default DeletePrescriptionsDetailComponent;
