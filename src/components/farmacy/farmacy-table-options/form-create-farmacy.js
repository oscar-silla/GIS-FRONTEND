import { Form, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const FormCreateFarmacyComponent = ({ handleOk }) => {

    const [farmacies, setFarmacies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/farmacies')
            .then(result => {
                const { data } = result.data;
                setFarmacies(data);
            });
    }, []);

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues,
            'id_farmacy': farmacies.length+1
        }
        handleOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                id='form-create-farmacy'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce el nombre de la empresa!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    name="phone"
                    rules={[{ required: true, message: 'Introduce un teléfono de contacto!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                    rules={[{ required: true, message: 'Introduce la dirección de la empresa!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormCreateFarmacyComponent;