import React from 'react';
import { Form, Input} from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};


const FormUpdateMedicineCategoryComponent = ({ handleOk }) => {

    const onFinish = (fieldValues) => {
        const values = {
            ...fieldValues
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
                id='form-update-medicine-category'
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

export default FormUpdateMedicineCategoryComponent;
