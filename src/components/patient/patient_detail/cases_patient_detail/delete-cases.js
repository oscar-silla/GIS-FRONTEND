import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const DeleteCasesComponent = ({ id, setUpdated }) => {

    function showConfirm() {
        confirm({
            title: 'Está seguro de que desea eliminar el caso?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                axios.delete(`http://localhost:4000/cases/delete/${id}`)
                        .then(res => {
                            setUpdated(true)
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

export default DeleteCasesComponent;