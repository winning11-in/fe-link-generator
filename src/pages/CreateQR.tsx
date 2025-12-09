/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Input, Button, Space, message, Tabs } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI } from '../services/api';
import Header from '../components/dashboard/Header';
import TemplateSelection from '../components/qr-generator/TemplateSelection';
import { templates } from '../components/qr-generator/templates';
import type { QRTemplate } from '../components/qr-generator/templates';
import ContentForm from '../components/qr-generator/ContentForm';
import CustomizationTabs from '../components/qr-generator/CustomizationTabs';
import QRPreview from '../components/qr-generator/QRPreview';

const { Content } = Layout;
const { Title, Text } = Typography;

const CreateQR = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>(templates[0]);
  const [title, setTitle] = useState('');
  const [qrData, setQrData] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [loading, setLoading] = useState(false);

  // Advanced customization
  const [dotStyle, setDotStyle] = useState('square');
  const [cornerSquareStyle, setCornerSquareStyle] = useState('square');
  const [cornerDotStyle, setCornerDotStyle] = useState('square');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoPadding, setLogoPadding] = useState(5);
  const [removeBackground, setRemoveBackground] = useState(true);

  // Template-specific fields
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  // UPI fields
  const [upiID, setUpiID] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');

  const generateQRData = () => {
    switch (selectedTemplate.type) {
      case 'url':
        return qrData;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'sms':
        return `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
      case 'text':
        return qrData;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
      case 'location':
        return `geo:${latitude},${longitude}`;
      case 'upi': {
        // UPI payment URL format: upi://pay?pa=<UPI_ID>&pn=<Name>&am=<Amount>&tn=<Note>
        let upiUrl = `upi://pay?pa=${upiID}`;
        if (upiName) upiUrl += `&pn=${encodeURIComponent(upiName)}`;
        if (upiAmount) upiUrl += `&am=${upiAmount}`;
        if (upiNote) upiUrl += `&tn=${encodeURIComponent(upiNote)}`;
        return upiUrl;
      }
      default:
        return qrData;
    }
  };

  const handleSaveQR = async () => {
    try {
      setLoading(true);
      const data = generateQRData();
      
      if (!title || !data) {
        message.error('Please fill in all required fields');
        return;
      }

      const qrType = ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'location', 'upi'].includes(selectedTemplate.type) 
        ? selectedTemplate.type as 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi'
        : 'text';

      await qrCodeAPI.create({
        title,
        data,
        type: qrType,
        customization: {
          qrColor,
          bgColor,
          qrSize,
          errorLevel,
          dotStyle,
          cornerSquareStyle,
          cornerDotStyle,
          logo,
          logoSize,
          logoPadding,
          removeBackground,
        },
      });

      message.success('QR Code created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to create QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Download handled by QRPreview component
    message.success('QR Code downloaded!');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const customizationTabs = CustomizationTabs({
    qrColor,
    setQrColor,
    bgColor,
    setBgColor,
    qrSize,
    setQrSize,
    errorLevel,
    setErrorLevel,
    dotStyle,
    setDotStyle,
    cornerSquareStyle,
    setCornerSquareStyle,
    cornerDotStyle,
    setCornerDotStyle,
    logo,
    setLogo,
    logoSize,
    setLogoSize,
    logoPadding,
    setLogoPadding,
    removeBackground,
    setRemoveBackground,
  });

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header
        userName={user?.name || 'User'}
        onCreateClick={() => {}}
        onLogout={handleLogout}
      />

      <Content style={{ padding: '32px 50px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Back Button */}
          <Button
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate('/dashboard')}
            style={{ marginBottom: 24 }}
          >
            Back to Dashboard
          </Button>

          {/* Page Header */}
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Create QR Code
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Choose a template and customize your QR code
            </Text>
          </div>

          <Row gutter={[32, 32]}>
            {/* Left Column - Templates & Form */}
            <Col xs={24} lg={14}>
              {/* Template Selection */}
              <Card
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  marginBottom: 24,
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                  1. Choose QR Code Type
                </Title>
                <TemplateSelection
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              </Card>

              {/* Content Form */}
              <Card
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  marginBottom: 24,
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                  2. Enter Content
                </Title>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      QR Code Title *
                    </Text>
                    <Input
                      size="large"
                      placeholder="e.g., Website Link, Contact Info"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      {selectedTemplate.name} *
                    </Text>
                    <ContentForm
                      templateType={selectedTemplate.type}
                      qrData={qrData}
                      setQrData={setQrData}
                      emailTo={emailTo}
                      setEmailTo={setEmailTo}
                      emailSubject={emailSubject}
                      setEmailSubject={setEmailSubject}
                      emailBody={emailBody}
                      setEmailBody={setEmailBody}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      smsNumber={smsNumber}
                      setSmsNumber={setSmsNumber}
                      smsMessage={smsMessage}
                      setSmsMessage={setSmsMessage}
                      wifiSSID={wifiSSID}
                      setWifiSSID={setWifiSSID}
                      wifiPassword={wifiPassword}
                      setWifiPassword={setWifiPassword}
                      wifiEncryption={wifiEncryption}
                      setWifiEncryption={setWifiEncryption}
                      latitude={latitude}
                      setLatitude={setLatitude}
                      longitude={longitude}
                      setLongitude={setLongitude}
                      upiID={upiID}
                      setUpiID={setUpiID}
                      upiName={upiName}
                      setUpiName={setUpiName}
                      upiAmount={upiAmount}
                      setUpiAmount={setUpiAmount}
                      upiNote={upiNote}
                      setUpiNote={setUpiNote}
                    />
                  </div>
                </Space>
              </Card>

              {/* Customization */}
              <Card
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                  3. Customize Design
                </Title>
                <Tabs items={customizationTabs} />
              </Card>
            </Col>

            {/* Right Column - Preview & Actions */}
            <Col xs={24} lg={10}>
              <QRPreview
                qrData={generateQRData() || 'https://example.com'}
                qrColor={qrColor}
                bgColor={bgColor}
                qrSize={qrSize}
                errorLevel={errorLevel}
                dotStyle={dotStyle}
                cornerSquareStyle={cornerSquareStyle}
                cornerDotStyle={cornerDotStyle}
                logo={logo}
                logoSize={logoSize}
                logoPadding={logoPadding}
                removeBackground={removeBackground}
                title={title}
                loading={loading}
                onSave={handleSaveQR}
                onDownload={handleDownload}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateQR;
