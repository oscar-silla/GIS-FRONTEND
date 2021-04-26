import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteCasesComponent = ({ setUpdated, currentId }) => {

    const showConfirm = () => {
        confirm({
            title: '¿Desea eliminar el caso?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/cases/delete/${currentId}`)
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
            <span className='delete-color option' onClick={showConfirm}>Delete</span>
        </div>
    );
}

export default DeleteCasesComponent;
