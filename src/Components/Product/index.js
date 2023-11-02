import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Input, Form, message, Spin } from 'antd';
import {
    EditOutlined,
} from '@ant-design/icons';
import AddProduct from "../AddProduct"
import { fetchAllProduct, deleteProductData, editProduct } from '../../store/action';

const Product = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)

    const list = useSelector(state => state.login.list);
    console.log('list: ', list);

    const handleChange = (event) => {
        if (event.target.name === "title") {
            const updatedProductData = Object.assign(modalData, { title: event.target.value })
            setModalData({ ...updatedProductData })
        }
        if (event.target.name === "price") {
            const updatedProductData = Object.assign(modalData, { price: event.target.value })
            setModalData({ ...updatedProductData })
        }
        if (event.target.name === "category") {
            const updatedProductData = Object.assign(modalData, { category: event.target.value })
            setModalData({ ...updatedProductData })
        }
        if (event.target.name === "description") {
            const updatedProductData = Object.assign(modalData, { description: event.target.value })
            setModalData({ ...updatedProductData })
        }
    };

    const showModal = (record) => {
        let newObj = Object.assign({}, record)
        setIsModalOpen(true);
        setModalData(newObj)
        setTitle(record.title)
        setPrice(record.price)
        setCategory(record.category)
        setDescription(record.description)
    };
    const handleOk = () => {
        messageApi.open({
            type: 'success',
            content: 'Edited Product SuccessFully',
        });
        setIsModalOpen(false);
        const body = {
            title: modalData.title,
            price: modalData.price,
            category: modalData.category,
            description: modalData.description
        }
        dispatch(editProduct(body, modalData.id));
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setLoading(true)
        dispatch(fetchAllProduct())
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (imageURL) => (
                <img src={imageURL} alt="Product" style={{ maxWidth: '30px' }} />
            ),

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <>
                        <Button onClick={() => showModal(record)}  >
                            <EditOutlined />
                        </Button>
                    </>
                )
            }
        },
        {
            id: 'Operation',
            title: 'Operation',
            dataIndex: 'Operation',
            key: 'Operation',
            render: (text, record) => {
                return <Button type="primary" onClick={() => dispatch(deleteProductData(record.id))
                } >
                    Delete
                </Button>
            }
        },
    ];

    return (
        <>
            {contextHolder}
            {loading ? (
                <Spin size="large" />
            ) : (
                <div>
                    <Modal title="Edit Product" okText="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form.Item label="Title">
                            <Input
                                placeholder="input placeholder"
                                defaultValue={modalData.title}
                                type="text"
                                onChange={handleChange}
                                name="title" />
                        </Form.Item>
                        <Form.Item label="price">
                            <Input
                                defaultValue={modalData.price}
                                type="number"
                                name="price"
                                placeholder="price"
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="category">
                            <Input
                                value={modalData.category}
                                type="text"
                                name="category"
                                placeholder="category"
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="description">
                            <Input
                                value={modalData.description}
                                type="text"
                                name="description"
                                placeholder="description"
                                onChange={handleChange} />
                        </Form.Item>
                    </Modal>
                    <AddProduct />
                    <Table columns={columns} dataSource={list} />
                    {/* {Array.isArray(list) ? (
                <Table columns={columns} dataSource={list} />
            ) : (
                <Table columns={columns} dataSource={[list]} /> // Wrap the object in an array
            )} */}
                </div>
            )}
        </>

    )
}

export default Product;