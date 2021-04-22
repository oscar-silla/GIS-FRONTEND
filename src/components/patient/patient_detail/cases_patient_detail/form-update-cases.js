import React from 'react';
import { Form, Input } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 0 },
};
const tailLayout = {
    wrapperCol: { offset: 3, span: 0 },
};

const FormUpdateCasesComponent = ({ onOk }) => {

    const onFinish = (values) => {
        onOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <Form
                {...layout}
                id='update-cases'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Introduce un título!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Descripción"
                    name="description"
                    rules={[{ required: true, message: 'Introduce una descripción!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

            </Form>
        </div>
    );
}

export default FormUpdateCasesComponent;