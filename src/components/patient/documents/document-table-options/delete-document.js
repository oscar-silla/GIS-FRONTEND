import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteDocumentComponent = ({ currentId, setUpdated }) => {

    const showConfirm = () => {
        confirm({
            title: 'Desea eliminar este documento?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                console.log('OK');
                axios.delete(`http://localhost:4000/documents/delete/${currentId}`)
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
    )
}

export default DeleteDocumentComponent;
