import React from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import FormUpdateRecepcionistComponent from './form-update-recepcionist';


const UpdateRecepcionistComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, setUpdated, currentId }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/recepcionists/update/${currentId}`, values)
            .then(res => {
                console.log(res);
                setUpdated(true);
            });
        setIsModalUpdateVisible(false);
    };

    const handleCancel = () => {
        setIsModalUpdateVisible(false);
    };

    return (
        <div>
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Button form='form-update-recepcionist' key='submit' htmlType='submit'>
                        Aceptar
                    </Button>
                }>
                <FormUpdateRecepcionistComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateRecepcionistComponent;