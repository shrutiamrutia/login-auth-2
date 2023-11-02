import React, { useState } from 'react';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../store/action";

const AddProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changePrice = (event) => {
        setPrice(event.target.value);
    };

    const changeCategory = (event) => {
        setCategory(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsLoading(true);
        setTimeout(() => {
            messageApi.open({
                type: 'success',
                content: 'Added Product Successfully',
            });
            setIsModalOpen(false);
            setIsLoading(false);
            const body = {
                "title": title,
                "description": description,
                "price": price,
                "category": category,
            }
            dispatch(addNewProduct(body));
        }, 1000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>{contextHolder}
            <Space wrap style={{
                fontSize: '24px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'right',
                bottom: '10px'
            }}>
                <Button type="primary" onClick={showModal}>
                    Add Product
                </Button>
            </Space>
            <Modal title="Add Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Add" confirmLoading={isLoading}>

                <Form.Item label="Title">
                    <Input
                        placeholder="title"
                        type="text"
                        name="title"
                        onChange={changeTitle}
                        value={title} />
                </Form.Item>
                <Form.Item label="Price">
                    <Input
                        type="number"
                        name="price"
                        placeholder="price"
                        onChange={changePrice}
                        value={price}
                    />
                </Form.Item>
                <Form.Item label="Category">
                    <Input
                        type="text"
                        name="category"
                        placeholder="category"
                        onChange={changeCategory}
                        value={category}
                    />
                </Form.Item>
                <Form.Item label="Description">
                    <Input
                        placeholder="description"
                        type="text"
                        name="description"
                        onChange={changeDescription}
                        value={description} />
                </Form.Item>

            </Modal>
        </>
    );
};

export default AddProduct;