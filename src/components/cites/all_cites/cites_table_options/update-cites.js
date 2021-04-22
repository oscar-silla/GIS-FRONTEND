import React from 'react';
import { Button, Modal } from 'antd';
import FormUpdateCitesComponent from './form-update-cites';
import axios from 'axios';

const UpdateCitesComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, currentId, setUpdated }) => {

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/cites/update/${currentId}`, values)
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                })
        setIsModalUpdateVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalUpdateVisible(false);
      };

    return (
        <div>
            <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
            footer={
                <Button form='form-update-cites' key='submit' htmlType='submit'>
                    Aceptar
                </Button>
            }>
                <FormUpdateCitesComponent handleOk={handleOk} />
            </Modal>
        </div>
    );
}

export default UpdateCitesComponent;
