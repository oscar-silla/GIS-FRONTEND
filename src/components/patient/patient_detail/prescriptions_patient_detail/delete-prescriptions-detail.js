import React from 'react'
import { Modal } from 'antd';
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
            <span className='delete-color option' onClick={showConfirm}>Borrar</span>
        </div>
    );
}

export default DeletePrescriptionsDetailComponent;
