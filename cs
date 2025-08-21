import React, { useState } from 'react';
import {
  Modal,
  Input,
  Select,
  Switch,
  Button,
  Row,
  Col,
  DatePicker,
  InputNumber,
  message,
  Space,
  Divider
} from 'antd';
import {
  ArrowRightOutlined,
  ExpandOutlined,
  CompressOutlined,
  SettingOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Option } = Select;

const ProductModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [loading, setLoading] = useState(false);

  // Input criteria state
  const [inputData, setInputData] = useState({
    docType: '',
    clientFmid: '',
    entity: [],
    product: 'IRD',
    subProduct: 'IRS + 1 more...',
    variant: '',
    businessEvent: '',
    referenceCurrency: '',
    settlementCurrency: ''
  });

  // Output criteria state
  const [outputData, setOutputData] = useState({
    startDate: null,
    settlementDays: '',
    currencySpotRate: '',
    settlementRateOption: '',
    settlementRate: '',
    referenceCurrencySpotRate: '',
    currencyFixingTime: '',
    disruptionFallbacks1A: false,
    disruptionFallbacks1B: false,
    disruptionFallbacks2A: false,
    disruptionFallbacks2B: false,
    disruptionFallbacks3A: false,
    disruptionFallbacks3B: false,
    leg1BusinessCenter: '',
    leg2BusinessCenter: '',
    additionalField1: '',
    additionalField2: '',
    additionalField3: '',
    additionalField4: '',
    additionalField5: '',
    additionalSwitch1: false,
    additionalSwitch2: false
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsMaximized(false);
    // Reset form data
    setInputData({
      docType: '',
      clientFmid: '',
      entity: [],
      product: 'IRD',
      subProduct: 'IRS + 1 more...',
      variant: '',
      businessEvent: '',
      referenceCurrency: '',
      settlementCurrency: ''
    });
    setOutputData({
      startDate: null,
      settlementDays: '',
      currencySpotRate: '',
      settlementRateOption: '',
      settlementRate: '',
      referenceCurrencySpotRate: '',
      currencyFixingTime: '',
      disruptionFallbacks1A: false,
      disruptionFallbacks1B: false,
      disruptionFallbacks2A: false,
      disruptionFallbacks2B: false,
      disruptionFallbacks3A: false,
      disruptionFallbacks3B: false,
      leg1BusinessCenter: '',
      leg2BusinessCenter: '',
      additionalField1: '',
      additionalField2: '',
      additionalField3: '',
      additionalField4: '',
      additionalField5: '',
      additionalSwitch1: false,
      additionalSwitch2: false
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!inputData.docType || !inputData.clientFmid) {
      message.error('Please fill in all required fields');
      return;
    }
    
    console.log('Input Data:', inputData);
    console.log('Output Data:', outputData);
    message.success('Product configuration saved successfully!');
    handleCancel();
  };

  const handleNext = async () => {
    // Validate required fields before API call
    if (!inputData.docType || !inputData.clientFmid) {
      message.error('Please fill in required input criteria before proceeding');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API response - populate output fields
      setOutputData(prev => ({
        ...prev,
        settlementDays: 2,
        currencySpotRate: '1.0850',
        settlementRate: '1.0845',
        referenceCurrencySpotRate: '1.0855',
        currencyFixingTime: '16:00 GMT',
        leg1BusinessCenter: 'New York',
        leg2BusinessCenter: 'London',
        disruptionFallbacks1A: true,
        disruptionFallbacks2A: true
      }));
      
      message.success('Data processed successfully!');
    } catch (error) {
      message.error('Failed to process data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalProps = isMaximized 
    ? { width: '95vw', style: { top: 20, paddingBottom: 0 } }
    : { width: '70vw', style: { top: 50 } };

  const fieldStyle = { marginBottom: '16px' };
  const labelStyle = { 
    display: 'block', 
    marginBottom: '4px', 
    fontWeight: '500',
    fontSize: '14px',
    color: '#333'
  };
  const inputStyle = { width: '100%' };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" size="large" onClick={showModal} icon={<SettingOutlined />}>
        Open Product Configuration
      </Button>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              <DollarOutlined />
              <span>Product Configuration</span>
            </Space>
            <Button
              type="text"
              icon={isMaximized ? <CompressOutlined /> : <ExpandOutlined />}
              onClick={toggleMaximize}
              size="small"
            />
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="discard" onClick={handleCancel}>
            Discard
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>
        ]}
        {...modalProps}
        bodyStyle={{
          height: isMaximized ? 'calc(95vh - 110px)' : '75vh',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{ height: '100%', display: 'flex' }}>
          {/* Left Section - Input Criteria */}
          <div 
            style={{ 
              flex: 1, 
              borderRight: '1px solid #f0f0f0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div 
              style={{ 
                padding: '12px 16px', 
                background: '#fafafa', 
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              <SettingOutlined style={{ marginRight: '8px' }} />
              Input Criteria
            </div>
            <div 
              style={{ 
                flex: 1, 
                padding: '16px', 
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <div style={fieldStyle}>
                <label style={labelStyle}>Doc Type *</label>
                <Input 
                  placeholder="Input Doc Type" 
                  style={inputStyle}
                  value={inputData.docType}
                  onChange={(e) => setInputData(prev => ({ ...prev, docType: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Client FMID *</label>
                <Select 
                  placeholder="Select Client Fmid"
                  style={inputStyle}
                  value={inputData.clientFmid}
                  onChange={(value) => setInputData(prev => ({ ...prev, clientFmid: value }))}
                >
                  <Option value="client1">Client 1</Option>
                  <Option value="client2">Client 2</Option>
                  <Option value="client3">Client 3</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Entity</label>
                <Select 
                  mode="multiple" 
                  placeholder="Select option(s)"
                  style={inputStyle}
                  value={inputData.entity}
                  onChange={(value) => setInputData(prev => ({ ...prev, entity: value }))}
                >
                  <Option value="entity1">Entity 1</Option>
                  <Option value="entity2">Entity 2</Option>
                  <Option value="entity3">Entity 3</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Product</label>
                <Select 
                  style={inputStyle}
                  value={inputData.product}
                  onChange={(value) => setInputData(prev => ({ ...prev, product: value }))}
                >
                  <Option value="IRD">IRD</Option>
                  <Option value="FX">FX</Option>
                  <Option value="EQ">EQ</Option>
                  <Option value="CR">CR</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Sub Product</label>
                <Input 
                  disabled 
                  style={inputStyle}
                  value={inputData.subProduct}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Variant</label>
                <Select 
                  placeholder="Input Variant"
                  style={inputStyle}
                  value={inputData.variant}
                  onChange={(value) => setInputData(prev => ({ ...prev, variant: value }))}
                >
                  <Option value="variant1">Variant 1</Option>
                  <Option value="variant2">Variant 2</Option>
                  <Option value="variant3">Variant 3</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Business Event</label>
                <Select 
                  placeholder="Input Business Event"
                  style={inputStyle}
                  value={inputData.businessEvent}
                  onChange={(value) => setInputData(prev => ({ ...prev, businessEvent: value }))}
                >
                  <Option value="trade">Trade</Option>
                  <Option value="amendment">Amendment</Option>
                  <Option value="termination">Termination</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Reference Currency</label>
                <Input 
                  placeholder="Enter reference currency"
                  style={inputStyle}
                  value={inputData.referenceCurrency}
                  onChange={(e) => setInputData(prev => ({ ...prev, referenceCurrency: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Settlement Currency</label>
                <Input 
                  placeholder="Enter settlement currency"
                  style={inputStyle}
                  value={inputData.settlementCurrency}
                  onChange={(e) => setInputData(prev => ({ ...prev, settlementCurrency: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Center Section - Next Button */}
          <div 
            style={{ 
              width: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#fafafa',
              borderRight: '1px solid #f0f0f0'
            }}
          >
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              loading={loading}
              style={{
                height: '50px',
                width: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </div>

          {/* Right Section - Output Criteria */}
          <div 
            style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div 
              style={{ 
                padding: '12px 16px', 
                background: '#fafafa', 
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              <DollarOutlined style={{ marginRight: '8px' }} />
              Output Criteria
            </div>
            <div 
              style={{ 
                flex: 1, 
                padding: '16px', 
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <div style={fieldStyle}>
                <label style={labelStyle}>Start Date</label>
                <DatePicker 
                  style={inputStyle}
                  placeholder="Select date"
                  value={outputData.startDate}
                  onChange={(date) => setOutputData(prev => ({ ...prev, startDate: date }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Number Of Settlement Days</label>
                <InputNumber 
                  style={inputStyle}
                  placeholder="Enter days"
                  value={outputData.settlementDays}
                  onChange={(value) => setOutputData(prev => ({ ...prev, settlementDays: value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Settlement Currency Spot Rate</label>
                <Input 
                  placeholder="Enter spot rate"
                  style={inputStyle}
                  value={outputData.currencySpotRate}
                  onChange={(e) => setOutputData(prev => ({ ...prev, currencySpotRate: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Settlement Rate Option</label>
                <Input 
                  placeholder="Enter settlement rate option"
                  style={inputStyle}
                  value={outputData.settlementRateOption}
                  onChange={(e) => setOutputData(prev => ({ ...prev, settlementRateOption: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Settlement Rate</label>
                <Input 
                  placeholder="Enter settlement rate"
                  style={inputStyle}
                  value={outputData.settlementRate}
                  onChange={(e) => setOutputData(prev => ({ ...prev, settlementRate: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Reference Currency Spot Rate</label>
                <Input 
                  placeholder="Enter reference spot rate"
                  style={inputStyle}
                  value={outputData.referenceCurrencySpotRate}
                  onChange={(e) => setOutputData(prev => ({ ...prev, referenceCurrencySpotRate: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Settlement Currency Fixing Time</label>
                <Input 
                  placeholder="Enter fixing time"
                  style={inputStyle}
                  value={outputData.currencyFixingTime}
                  onChange={(e) => setOutputData(prev => ({ ...prev, currencyFixingTime: e.target.value }))}
                />
              </div>

              <Divider orientation="left" style={{ fontSize: '12px', marginTop: '24px', marginBottom: '16px' }}>
                Disruption Fallbacks
              </Divider>

              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 1A</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks1A}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks1A: checked }))}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 1B</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks1B}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks1B: checked }))}
                    />
                  </div>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 2A</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks2A}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks2A: checked }))}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 2B</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks2B}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks2B: checked }))}
                    />
                  </div>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 3A</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks3A}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks3A: checked }))}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Disruption Fallbacks 3B</label>
                    <Switch 
                      checked={outputData.disruptionFallbacks3B}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, disruptionFallbacks3B: checked }))}
                    />
                  </div>
                </Col>
              </Row>

              <Divider orientation="left" style={{ fontSize: '12px', marginTop: '24px', marginBottom: '16px' }}>
                Business Centers
              </Divider>

              <div style={fieldStyle}>
                <label style={labelStyle}>Leg 1 Business Center for Payment</label>
                <Input 
                  placeholder="Enter business center"
                  style={inputStyle}
                  value={outputData.leg1BusinessCenter}
                  onChange={(e) => setOutputData(prev => ({ ...prev, leg1BusinessCenter: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Leg 2 Business Center for Payment</label>
                <Input 
                  placeholder="Enter business center"
                  style={inputStyle}
                  value={outputData.leg2BusinessCenter}
                  onChange={(e) => setOutputData(prev => ({ ...prev, leg2BusinessCenter: e.target.value }))}
                />
              </div>

              <Divider orientation="left" style={{ fontSize: '12px', marginTop: '24px', marginBottom: '16px' }}>
                Additional Fields
              </Divider>

              <div style={fieldStyle}>
                <label style={labelStyle}>Additional Field 1</label>
                <Input 
                  placeholder="Enter additional field 1"
                  style={inputStyle}
                  value={outputData.additionalField1}
                  onChange={(e) => setOutputData(prev => ({ ...prev, additionalField1: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Additional Field 2</label>
                <Input 
                  placeholder="Enter additional field 2"
                  style={inputStyle}
                  value={outputData.additionalField2}
                  onChange={(e) => setOutputData(prev => ({ ...prev, additionalField2: e.target.value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Additional Field 3</label>
                <Select 
                  placeholder="Select option"
                  style={inputStyle}
                  value={outputData.additionalField3}
                  onChange={(value) => setOutputData(prev => ({ ...prev, additionalField3: value }))}
                >
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Additional Field 4</label>
                <InputNumber 
                  style={inputStyle}
                  placeholder="Enter number"
                  value={outputData.additionalField4}
                  onChange={(value) => setOutputData(prev => ({ ...prev, additionalField4: value }))}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Additional Field 5</label>
                <Input.TextArea 
                  rows={2} 
                  placeholder="Enter additional notes"
                  style={inputStyle}
                  value={outputData.additionalField5}
                  onChange={(e) => setOutputData(prev => ({ ...prev, additionalField5: e.target.value }))}
                />
              </div>

              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Additional Switch 1</label>
                    <Switch 
                      checked={outputData.additionalSwitch1}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, additionalSwitch1: checked }))}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Additional Switch 2</label>
                    <Switch 
                      checked={outputData.additionalSwitch2}
                      onChange={(checked) => setOutputData(prev => ({ ...prev, additionalSwitch2: checked }))}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductModal;
