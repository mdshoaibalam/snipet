import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Select, Switch, Space, message, Spin , Row , Col} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

const ProductSubproductManager = () => {
    const [products, setProducts] = useState([]);
    const [subproducts, setSubproducts] = useState([]);
    const [filteredSubproducts, setFilteredSubproducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showAllSubproducts, setShowAllSubproducts] = useState(true);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [subproductModalVisible, setSubproductModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [subForm] = Form.useForm();
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingSubproduct, setEditingSubproduct] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock API functions
    const fetchProducts = async () => {
        setProducts([
            { id: 1, name: 'Mobile' },
            { id: 2, name: 'Laptop' },
        ]);
    };

    const fetchSubproducts = async () => {
        setSubproducts([
            { id: 1, name: 'iPhone', productId: 1 },
            { id: 2, name: 'Galaxy', productId: 1 },
            { id: 3, name: 'MacBook', productId: 2 },
        ]);
    };

    useEffect(() => {
        fetchProducts();
        fetchSubproducts();
    }, []);

    useEffect(() => {
        if (showAllSubproducts) {
            setFilteredSubproducts(subproducts);
        } else {
            setFilteredSubproducts(subproducts.filter(sp => sp.productId === selectedProductId));
        }
    }, [subproducts, showAllSubproducts, selectedProductId]);

    const handleAddOrUpdateProduct = async (values) => {
        setLoading(true);
        setTimeout(() => {
            if (editingProduct) {
                const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...values } : p);
                setProducts(updated);
                message.success('Product updated');
            } else {
                const newProduct = { id: Date.now(), ...values };
                setProducts([...products, newProduct]);
                message.success('Product added');
            }
            form.resetFields();
            setProductModalVisible(false);
            setEditingProduct(null);
            setLoading(false);
        }, 1000);
    };

    const handleAddOrUpdateSubproduct = async (values) => {
        setLoading(true);
        setTimeout(() => {
            if (editingSubproduct) {
                const updated = subproducts.map(sp =>
                    sp.id === editingSubproduct.id ? { ...sp, ...values } : sp
                );
                setSubproducts(updated);
                message.success('Subproduct updated');
            } else {
                const newSubproduct = { id: Date.now(), ...values };
                setSubproducts([...subproducts, newSubproduct]);
                message.success('Subproduct added');
            }
            subForm.resetFields();
            setSubproductModalVisible(false);
            setEditingSubproduct(null);
            setLoading(false);
        }, 1000);
    };

    const confirmDeleteProduct = (id) => {
        confirm({
            title: 'Are you sure you want to delete this product?',
            icon: <ExclamationCircleOutlined />,
            content: 'This will also delete all related subproducts.',
            onOk() {
                setLoading(true);
                setTimeout(() => {
                    setProducts(products.filter(p => p.id !== id));
                    setSubproducts(subproducts.filter(sp => sp.productId !== id));
                    message.success('Product and related subproducts deleted');
                    setLoading(false);
                }, 1000);
            }
        });
    };

    const confirmDeleteSubproduct = (id) => {
        confirm({
            title: 'Are you sure you want to delete this subproduct?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setLoading(true);
                setTimeout(() => {
                    setSubproducts(subproducts.filter(sp => sp.id !== id));
                    message.success('Subproduct deleted');
                    setLoading(false);
                }, 1000);
            }
        });
    };

    const productColumns = [
        { title: 'Product Name', dataIndex: 'name' },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => {
                        setEditingProduct(record);
                        form.setFieldsValue(record);
                        setProductModalVisible(true);
                    }} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => confirmDeleteProduct(record.id)} />
                </Space>
            ),
        },
    ];

    const subproductColumns = [
        { title: 'Subproduct Name', dataIndex: 'name' },
        {
            title: 'Product',
            render: (_, record) => products.find(p => p.id === record.productId)?.name || '',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => {
                        setEditingSubproduct(record);
                        subForm.setFieldsValue(record);
                        setSubproductModalVisible(true);
                    }} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => confirmDeleteSubproduct(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ padding: '10px' }}>
            <Content>
                <Spin spinning={loading}>
                    <Row gutter={16}>
                        {/* Left: Products */}
                        <Col span={12}>
                            <h2>Products</h2>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                                setEditingProduct(null);
                                form.resetFields();
                                setProductModalVisible(true);
                            }}>
                                Add Product
                            </Button>
                            <Table
                                dataSource={products}
                                columns={productColumns}
                                rowKey="id"
                                style={{ marginTop: 16 }}
                                pagination={false}
                                onRow={(record) => ({
                                    onClick: () => {
                                        setSelectedProductId(record.id);
                                        setShowAllSubproducts(false);
                                    },
                                })}
                            />
                        </Col>

                        {/* Right: Subproducts */}
                        <Col span={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2>Subproducts</h2>
                                <Switch
                                    checkedChildren="All"
                                    unCheckedChildren="Filtered"
                                    checked={showAllSubproducts}
                                    onChange={setShowAllSubproducts}
                                />
                            </div>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                                setEditingSubproduct(null);
                                subForm.resetFields();
                                setSubproductModalVisible(true);
                            }}>
                                Add Subproduct
                            </Button>
                            <Table
                                dataSource={filteredSubproducts}
                                columns={subproductColumns}
                                rowKey="id"
                                style={{ marginTop: 16 }}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </Spin>
            </Content>


            {/* Product Modal */}
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                open={productModalVisible}
                onCancel={() => setProductModalVisible(false)}
                onOk={() => form.submit()}
                okText="Save"
            >
                <Form form={form} layout="vertical" onFinish={handleAddOrUpdateProduct}>
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Subproduct Modal */}
            <Modal
                title={editingSubproduct ? 'Edit Subproduct' : 'Add Subproduct'}
                open={subproductModalVisible}
                onCancel={() => setSubproductModalVisible(false)}
                onOk={() => subForm.submit()}
                okText="Save"
            >
                <Form form={subForm} layout="vertical" onFinish={handleAddOrUpdateSubproduct}>
                    <Form.Item name="name" label="Subproduct Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="productId" label="Select Product" rules={[{ required: true }]}>
                        <Select placeholder="Select product">
                            {products.map(p => (
                                <Option key={p.id} value={p.id}>{p.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default ProductSubproductManager;
