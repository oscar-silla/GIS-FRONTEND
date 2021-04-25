import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};

const FormCreateMedicineCategoryComponent = ({ handleOk }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/medicine/categories')
                .then(res => {
                    const {data} = res.data;
                    setCategories(data);
                })
    }, [])

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues,
            'id_category': categories.length+1
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
                id='form-create-medicine-category'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce el nombre de la categoria!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='description' label="Descripción">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormCreateMedicineCategoryComponent;
