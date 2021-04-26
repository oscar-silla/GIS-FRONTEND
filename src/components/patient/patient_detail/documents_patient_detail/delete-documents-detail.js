import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteDocumentDetailComponent = ({id, setUpdated}) => {

    const showConfirm = () => {
        confirm({
            title: 'Desea eliminar el documento?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/documents/delete/${id}`)
                        .then(res => {
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

export default DeleteDocumentDetailComponent;