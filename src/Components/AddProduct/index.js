import React, { useState } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../store/action";

const AddProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');


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
        setIsModalOpen(false);
        // body 
        const body = {
            "title": title,
            "description": description,
            "price": price,
            "category": category,
            // "images": [
            //     "https://i.dummyjson.com/data/products/1/1.jpg",
            //     "https://i.dummyjson.com/data/products/1/2.jpg",
            //     "https://i.dummyjson.com/data/products/1/3.jpg",
            //     "https://i.dummyjson.com/data/products/1/4.jpg",
            //     "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            // ]
        }
        dispatch(addNewProduct(body));
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
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
            <Modal title="Add Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

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