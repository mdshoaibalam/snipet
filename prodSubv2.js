import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Layout,
  message,
  Spin,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;
const { confirm } = Modal;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [subproducts, setSubproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [subproductModalVisible, setSubproductModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingSubproduct, setEditingSubproduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAllSubproducts, setShowAllSubproducts] = useState(true);

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchSubproducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubproducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/subproducts');
      setSubproducts(response.data);
    } catch (error) {
      message.error('Failed to fetch subproducts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateProduct = async (values) => {
    try {
      setLoading(true);
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, values);
        message.success('Product updated');
      } else {
        await axios.post('/api/products', values);
        message.success('Product added');
      }
      fetchProducts();
      form.resetFields();
      setProductModalVisible(false);
      setEditingProduct(null);
    } catch (error) {
      message.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateSubproduct = async (values) => {
    try {
      setLoading(true);
      if (editingSubproduct) {
        await axios.put(`/api/subproducts/${editingSubproduct.id}`, values);
        message.success('Subproduct updated');
      } else {
        await axios.post('/api/subproducts', values);
        message.success('Subproduct added');
      }
      fetchSubproducts();
      subForm.resetFields();
      setSubproductModalVisible(false);
      setEditingSubproduct(null);
    } catch (error) {
      message.error('Failed to save subproduct');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteProduct = (id) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/products/${id}`);
          message.success('Product deleted');
          fetchProducts();
          fetchSubproducts();
        } catch (error) {
          message.error('Failed to delete product');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const confirmDeleteSubproduct = (id) => {
    confirm({
      title: 'Are you sure you want to delete this subproduct?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/subproducts/${id}`);
          message.success('Subproduct deleted');
          fetchSubproducts();
        } catch (error) {
          message.error('Failed to delete subproduct');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const productColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setProductModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => confirmDeleteProduct(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ];

  const subproductColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSubproduct(record);
              subForm.setFieldsValue(record);
              setSubproductModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => confirmDeleteSubproduct(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ];

  const filteredSubproducts = showAllSubproducts
    ? subproducts
    : subproducts.filter((sp) => sp.productId === selectedProductId);

  return (
    <Content>
      <Spin spinning={loading}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <h2>Products</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingProduct(null);
                form.resetFields();
                setProductModalVisible(true);
              }}
            >
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
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Subproducts</h2>
              <Switch
                checkedChildren="All"
                unCheckedChildren="Filtered"
                checked={showAllSubproducts}
                onChange={setShowAllSubproducts}
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingSubproduct(null);
                subForm.resetFields();
                setSubproductModalVisible(true);
              }}
            >
              Add Subproduct
            </Button>
            <Table
              dataSource={filteredSubproducts}
              columns={subproductColumns}
              rowKey="id"
              style={{ marginTop: 16 }}
              pagination={false}
            />
          </div>
        </div>
      </Spin>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={productModalVisible}
        onCancel={() => setProductModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdateProduct} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingSubproduct ? 'Edit Subproduct' : 'Add Subproduct'}
        open={subproductModalVisible}
        onCancel={() => setSubproductModalVisible(false)}
        onOk={() => subForm.submit()}
      >
        <Form form={subForm} onFinish={handleAddOrUpdateSubproduct} layout="vertical">
          <Form.Item name="name" label="Subproduct Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default ProductManager;
