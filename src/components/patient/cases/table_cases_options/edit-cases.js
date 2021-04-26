import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import FormEditCasesComponent from './form-edit-cases';
import axios from 'axios';

const EditCasesComponent = ({ isModalUpdateVisible, setIsModalUpdateVisible, currentId, setUpdated }) => {

    const [isNotUndefined, setIsNotUndefined] = useState(false);

    useEffect(() => {
        if (currentId !== undefined) {
            setIsNotUndefined(true);
        } else {
            setIsNotUndefined(false);
        }
    }, [currentId])

    const handleOk = (values) => {
        axios.put(`http://localhost:4000/cases/update/${currentId}`,values)
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
            {
                (isNotUndefined)
                    ? <Modal title="Editar Caso" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}
                        footer={
                            <Button form='form-edit-cases' key='submit' htmlType='submit'>
                                Aceptar
                            </Button>
                        }>
                        <FormEditCasesComponent handleOk={handleOk} />
                      </Modal>
                    : <Modal title="Basic Modal" visible={isModalUpdateVisible} onOk={handleOk} onCancel={handleCancel}>
                        <h1>No disponible</h1>
                      </Modal> 
            }

        </div>
    );
}

export default EditCasesComponent;
