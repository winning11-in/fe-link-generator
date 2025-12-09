/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Input, Select, Button, Space, message, ColorPicker, Tabs, Radio } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { Download, ArrowLeft, Link as LinkIcon, Mail, Phone, MessageSquare, Wifi, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI } from '../services/api';
import Header from '../components/dashboard/Header';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface QRTemplate {
  id: string;
  name: string;
  icon: any;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location';
  description: string;
}

const templates: QRTemplate[] = [
  { id: 'url', name: 'Website URL', icon: LinkIcon, type: 'url', description: 'Link to any website' },
  { id: 'email', name: 'Email', icon: Mail, type: 'email', description: 'Send an email' },
  { id: 'phone', name: 'Phone', icon: Phone, type: 'phone', description: 'Make a phone call' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, type: 'sms', description: 'Send a text message' },
  { id: 'text', name: 'Text', icon: MessageSquare, type: 'text', description: 'Plain text content' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, type: 'wifi', description: 'Connect to WiFi' },
  { id: 'location', name: 'Location', icon: MapPin, type: 'location', description: 'Share a location' },
];

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

      const qrType = ['url', 'text', 'email', 'phone'].includes(selectedTemplate.type) 
        ? selectedTemplate.type as 'url' | 'text' | 'email' | 'phone'
        : 'text';

      await qrCodeAPI.create({
        title,
        data,
        type: qrType,
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
    const svg = document.getElementById('qr-preview') as unknown as SVGElement;
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0, qrSize, qrSize);
      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob);
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `${title || 'qr-code'}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(pngUrl);
        }
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
    message.success('QR Code downloaded!');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const renderTemplateForm = () => {
    switch (selectedTemplate.type) {
      case 'url':
        return (
          <Input
            size="large"
            placeholder="https://example.com"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            prefix={<LinkIcon size={18} />}
          />
        );
      case 'email':
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="Email address"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              prefix={<Mail size={18} />}
            />
            <Input
              size="large"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            <TextArea
              placeholder="Email body"
              value={emailBody}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmailBody(e.target.value)}
              rows={4}
            />
          </Space>
        );
      case 'phone':
        return (
          <Input
            size="large"
            placeholder="+1 234 567 8900"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            prefix={<Phone size={18} />}
          />
        );
      case 'sms':
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="Phone number"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              prefix={<MessageSquare size={18} />}
            />
            <TextArea
              placeholder="Message"
              value={smsMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSmsMessage(e.target.value)}
              rows={4}
            />
          </Space>
        );
      case 'text':
        return (
          <TextArea
            placeholder="Enter your text here..."
            value={qrData}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQrData(e.target.value)}
            rows={6}
          />
        );
      case 'wifi':
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="Network name (SSID)"
              value={wifiSSID}
              onChange={(e) => setWifiSSID(e.target.value)}
              prefix={<Wifi size={18} />}
            />
            <Input.Password
              size="large"
              placeholder="Password"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
            />
            <Select
              size="large"
              value={wifiEncryption}
              onChange={setWifiEncryption}
              style={{ width: '100%' }}
              options={[
                { label: 'WPA/WPA2', value: 'WPA' },
                { label: 'WEP', value: 'WEP' },
                { label: 'No encryption', value: 'nopass' },
              ]}
            />
          </Space>
        );
      case 'location':
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="Latitude (e.g., 40.7128)"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              prefix={<MapPin size={18} />}
            />
            <Input
              size="large"
              placeholder="Longitude (e.g., -74.0060)"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Space>
        );
      default:
        return null;
    }
  };

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
                <Row gutter={[12, 12]}>
                  {templates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <Col xs={12} sm={8} md={6} key={template.id}>
                        <Card
                          hoverable
                          onClick={() => setSelectedTemplate(template)}
                          style={{
                            borderRadius: 8,
                            border: selectedTemplate.id === template.id ? '2px solid #6366f1' : '1px solid #e5e7eb',
                            background: selectedTemplate.id === template.id ? '#f0f0ff' : 'white',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                          bodyStyle={{ padding: '16px 8px' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                background: selectedTemplate.id === template.id ? '#6366f1' : '#f3f4f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Icon
                                size={20}
                                color={selectedTemplate.id === template.id ? 'white' : '#6b7280'}
                              />
                            </div>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: selectedTemplate.id === template.id ? 600 : 400,
                                color: selectedTemplate.id === template.id ? '#6366f1' : '#374151',
                              }}
                            >
                              {template.name}
                            </Text>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
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
                    {renderTemplateForm()}
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
                <Tabs
                  defaultActiveKey="colors"
                  items={[
                    {
                      key: 'colors',
                      label: 'Colors',
                      children: (
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                          <div>
                            <Text strong style={{ marginBottom: 8, display: 'block' }}>
                              QR Code Color
                            </Text>
                            <ColorPicker
                              value={qrColor}
                              onChange={(color) => setQrColor(color.toHexString())}
                              showText
                              size="large"
                            />
                          </div>
                          <div>
                            <Text strong style={{ marginBottom: 8, display: 'block' }}>
                              Background Color
                            </Text>
                            <ColorPicker
                              value={bgColor}
                              onChange={(color) => setBgColor(color.toHexString())}
                              showText
                              size="large"
                            />
                          </div>
                        </Space>
                      ),
                    },
                    {
                      key: 'settings',
                      label: 'Settings',
                      children: (
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                          <div>
                            <Text strong style={{ marginBottom: 8, display: 'block' }}>
                              Size
                            </Text>
                            <Radio.Group value={qrSize} onChange={(e) => setQrSize(e.target.value)}>
                              <Radio.Button value={128}>Small</Radio.Button>
                              <Radio.Button value={256}>Medium</Radio.Button>
                              <Radio.Button value={512}>Large</Radio.Button>
                              <Radio.Button value={1024}>Extra Large</Radio.Button>
                            </Radio.Group>
                          </div>
                          <div>
                            <Text strong style={{ marginBottom: 8, display: 'block' }}>
                              Error Correction Level
                            </Text>
                            <Select
                              size="large"
                              value={errorLevel}
                              onChange={setErrorLevel}
                              style={{ width: '100%' }}
                              options={[
                                { label: 'Low (7%)', value: 'L' },
                                { label: 'Medium (15%)', value: 'M' },
                                { label: 'Quartile (25%)', value: 'Q' },
                                { label: 'High (30%)', value: 'H' },
                              ]}
                            />
                            <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                              Higher levels allow QR code to work even if partially damaged
                            </Text>
                          </div>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>

            {/* Right Column - Preview & Actions */}
            <Col xs={24} lg={10}>
              <Card
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  position: 'sticky',
                  top: 24,
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                  Preview
                </Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 32,
                    background: '#f9fafb',
                    borderRadius: 12,
                    marginBottom: 24,
                  }}
                >
                  <QRCodeSVG
                    id="qr-preview"
                    value={generateQRData() || 'https://example.com'}
                    size={280}
                    level={errorLevel}
                    fgColor={qrColor}
                    bgColor={bgColor}
                    includeMargin={true}
                  />
                </div>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    onClick={handleSaveQR}
                    style={{
                      background: '#6366f1',
                      borderColor: '#6366f1',
                      height: 48,
                    }}
                  >
                    Save QR Code
                  </Button>
                  <Button
                    size="large"
                    block
                    icon={<Download size={18} />}
                    onClick={handleDownload}
                    style={{ height: 48 }}
                  >
                    Download QR Code
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateQR;
