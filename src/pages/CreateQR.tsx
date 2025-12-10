import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Row, Col, Input, Button, Space, message, Tabs, Spin } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { qrCodeAPI } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import TemplateSelection from '../components/qr-generator/TemplateSelection';
import { templates } from '../components/qr-generator/templates';
import type { QRTemplate } from '../components/qr-generator/templates';
import ContentForm from '../components/qr-generator/ContentForm';
import CustomizationTabs from '../components/qr-generator/CustomizationTabs';
import QRPreview from '../components/qr-generator/QRPreview';

const { Title, Text } = Typography;

const CreateQR = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>(templates[0]);
  const [title, setTitle] = useState('');
  const [qrData, setQrData] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [loading, setLoading] = useState(false);
  const [fetchingQR, setFetchingQR] = useState(false);
  const isEditMode = !!id;

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

  // Load existing QR code data when editing
  useEffect(() => {
    const loadQRCode = async () => {
      if (!id) return;

      try {
        setFetchingQR(true);
        const response = await qrCodeAPI.getOne(id);
        console.log('API Response:', response); // Debug log
        
        // Backend returns { success: true, qrCode: {...} }
        // Axios unwraps response.data, so we get { success, qrCode }
        const qr = response.qrCode;

        if (!qr) {
          throw new Error('QR code data not found in response');
        }

        // Set basic fields
        setTitle(qr.title);
        setQrData(qr.data);

        // Set customization if available
        if (qr.customization) {
          const c = qr.customization;
          if (c.qrColor) setQrColor(c.qrColor);
          if (c.bgColor) setBgColor(c.bgColor);
          if (c.qrSize) setQrSize(c.qrSize);
          if (c.errorLevel) setErrorLevel(c.errorLevel);
          if (c.dotStyle) setDotStyle(c.dotStyle);
          if (c.cornerSquareStyle) setCornerSquareStyle(c.cornerSquareStyle);
          if (c.cornerDotStyle) setCornerDotStyle(c.cornerDotStyle);
          if (c.logo) setLogo(c.logo);
          if (c.logoSize) setLogoSize(c.logoSize);
          if (c.logoPadding) setLogoPadding(c.logoPadding);
          if (c.removeBackground !== undefined) setRemoveBackground(c.removeBackground);
        }

        // Set template and type-specific fields
        const template = templates.find(t => t.type === qr.type) || templates[0];
        setSelectedTemplate(template);

        // Parse data based on type
        switch (qr.type) {
          case 'email': {
            const emailMatch = qr.data.match(/mailto:([^?]+)\?subject=([^&]*)&body=(.*)/);
            if (emailMatch) {
              setEmailTo(emailMatch[1]);
              setEmailSubject(decodeURIComponent(emailMatch[2]));
              setEmailBody(decodeURIComponent(emailMatch[3]));
            }
            break;
          }
          case 'phone':
            setPhoneNumber(qr.data.replace('tel:', ''));
            break;
          case 'sms': {
            const smsMatch = qr.data.match(/sms:([^?]+)\?body=(.*)/);
            if (smsMatch) {
              setSmsNumber(smsMatch[1]);
              setSmsMessage(decodeURIComponent(smsMatch[2]));
            }
            break;
          }
          case 'wifi': {
            const wifiMatch = qr.data.match(/WIFI:T:([^;]+);S:([^;]+);P:([^;]+);;/);
            if (wifiMatch) {
              setWifiEncryption(wifiMatch[1]);
              setWifiSSID(wifiMatch[2]);
              setWifiPassword(wifiMatch[3]);
            }
            break;
          }
          case 'location': {
            const locMatch = qr.data.match(/geo:([^,]+),(.*)/);
            if (locMatch) {
              setLatitude(locMatch[1]);
              setLongitude(locMatch[2]);
            }
            break;
          }
          case 'upi': {
            const upiMatch = qr.data.match(/upi:\/\/pay\?pa=([^&]+)(?:&pn=([^&]*))?(?:&am=([^&]*))?(?:&tn=([^&]*))?/);
            if (upiMatch) {
              setUpiID(upiMatch[1]);
              if (upiMatch[2]) setUpiName(decodeURIComponent(upiMatch[2]));
              if (upiMatch[3]) setUpiAmount(upiMatch[3]);
              if (upiMatch[4]) setUpiNote(decodeURIComponent(upiMatch[4]));
            }
            break;
          }
        }

        message.success('QR Code loaded for editing');
      } catch (err: any) {
        console.error('Load QR Error:', err); // Debug log
        message.error(err.response?.data?.message || err.message || 'Failed to load QR code');
        navigate('/dashboard');
      } finally {
        setFetchingQR(false);
      }
    };

    loadQRCode();
  }, [id, navigate]);

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

      const qrPayload = {
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
      };

      if (isEditMode) {
        await qrCodeAPI.update(id!, qrPayload);
        message.success('QR Code updated successfully!');
      } else {
        await qrCodeAPI.create(qrPayload);
        message.success('QR Code created successfully!');
      }

      navigate('/dashboard');
    } catch (err: any) {
      message.error(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} QR code`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    message.success('QR Code downloaded!');
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
    <AppLayout>
      {fetchingQR ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Spin size="large" tip="Loading QR Code..." />
        </div>
      ) : (
        <div style={{   margin: '0 auto' }}>
            <Button
              icon={<ArrowLeft size={18} />}
              onClick={() => navigate('/dashboard')}
              style={{ marginBottom: 16 }}
            >
              Back to Dashboard
            </Button>

            {/* Page Header */}
            <div style={{ marginBottom: 10 }}>
              <Title level={2} style={{ marginBottom: 8 }}>
                {isEditMode ? 'Edit QR Code' : 'Create QR Code'}
              </Title>
              
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
                  1. Choose Template {isEditMode && <Text type="secondary" style={{ fontSize: 14, fontWeight: 400 }}>(Cannot be changed)</Text>}
                </Title>
                <div style={{ opacity: isEditMode ? 0.6 : 1, pointerEvents: isEditMode ? 'none' : 'auto' }}>
                  <TemplateSelection
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                  />
                </div>
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
                saveButtonText={isEditMode ? 'Update QR Code' : 'Save QR Code'}
              />
            </Col>
          </Row>
        </div>
      )}
    </AppLayout>
  );
};

export default CreateQR;
