import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteLabReportComponent = ({ setUpdated, currentId }) => {

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar el informe?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/laboratory/reports/delete/${currentId}`)
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

export default DeleteLabReportComponent;
