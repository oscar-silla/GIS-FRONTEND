import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import FormCreateCasesDetailComponent from './form-create-cases';
import axios from 'axios';

const CreateCasesDetailComponent = ({ isModalCreateVisible, setIsModalCreateVisible, handleCancelCreate, idUser, setUpdated }) => {

    const [cases, setCases] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/cases')
            .then(res => {
                const { data } = res.data;
                setCases(data);
            });
    }, []);

    const onOk = (values) => {
        console.log(idUser)
        const data = {
            id_case: cases.length + 1,
            id_patient: idUser,
            date: new Date().toISOString(),
            title: values.title,
            case: values.description
        }
        axios.post('http://localhost:4000/cases/create', data)
            .then(res => {
                console.log(res);
                setUpdated(true);
            });
        setIsModalCreateVisible(false);
    }

    return (
        <div>
            <Modal title="Añadir caso" visible={isModalCreateVisible} onOk={onOk} onCancel={handleCancelCreate}
                footer={[
                    <Button form='create-cases-detail' key="submit" htmlType="submit">
                        Aceptar
                        </Button>
                ]}>
                <FormCreateCasesDetailComponent onOk={onOk}></FormCreateCasesDetailComponent>
            </Modal>
        </div>
    );
}

export default CreateCasesDetailComponent;