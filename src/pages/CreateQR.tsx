import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Row, Col, Input, Button, Space, message, Tabs, Spin, Steps, Segmented } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { qrCodeAPI } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import TemplateSelection from '../components/qr-generator/TemplateSelection';
import { templates } from '../components/qr-generator/templates';
import type { QRTemplate } from '../components/qr-generator/templates';
import ContentForm from '../components/qr-generator/ContentFormNew';
import CustomizationTabs from '../components/qr-generator/CustomizationTabsNew';
import QRPreview from '../components/qr-generator/QRPreviewNew';
import DesignTemplateSelection from '../components/qr-generator/DesignTemplateSelection';
import type { DesignTemplate } from '../components/qr-generator/designTemplates';
import type { GradientColor, FrameOptions } from '../types';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'jpeg'>('png');
  const isEditMode = !!id;

  // Advanced customization
  const [dotStyle, setDotStyle] = useState('square');
  const [cornerSquareStyle, setCornerSquareStyle] = useState('square');
  const [cornerDotStyle, setCornerDotStyle] = useState('square');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoPadding, setLogoPadding] = useState(5);
  const [removeBackground, setRemoveBackground] = useState(true);

  // NEW: Gradient colors
  const [qrColorGradient, setQrColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#000000',
  });
  const [bgColorGradient, setBgColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#ffffff',
  });

  // NEW: Background image
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgImageOpacity, setBgImageOpacity] = useState(1);

  // NEW: Spacing & Effects
  const [margin, setMargin] = useState(10);
  const [frameOptions, setFrameOptions] = useState<FrameOptions>({
    enabled: false,
    style: 'none',
    color: '#000000',
    text: '',
    textColor: '#ffffff',
  });
  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);

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

  // NEW: Social media fields
  const [socialUsername, setSocialUsername] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // NEW: vCard fields
  const [vcardFirstName, setVcardFirstName] = useState('');
  const [vcardLastName, setVcardLastName] = useState('');
  const [vcardOrganization, setVcardOrganization] = useState('');
  const [vcardTitle, setVcardTitle] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardWebsite, setVcardWebsite] = useState('');
  const [vcardAddress, setVcardAddress] = useState('');

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
          if (c.qrColorGradient) setQrColorGradient(c.qrColorGradient);
          if (c.bgColor) setBgColor(c.bgColor);
          if (c.bgColorGradient) setBgColorGradient(c.bgColorGradient);
          if (c.bgImage) setBgImage(c.bgImage);
          if (c.bgImageOpacity !== undefined) setBgImageOpacity(c.bgImageOpacity);
          if (c.qrSize) setQrSize(c.qrSize);
          if (c.errorLevel) setErrorLevel(c.errorLevel);
          if (c.dotStyle) setDotStyle(c.dotStyle);
          if (c.cornerSquareStyle) setCornerSquareStyle(c.cornerSquareStyle);
          if (c.cornerDotStyle) setCornerDotStyle(c.cornerDotStyle);
          if (c.logo) setLogo(c.logo);
          if (c.logoSize) setLogoSize(c.logoSize);
          if (c.logoPadding) setLogoPadding(c.logoPadding);
          if (c.removeBackground !== undefined) setRemoveBackground(c.removeBackground);
          if (c.margin !== undefined) setMargin(c.margin);
          if (c.frameOptions) setFrameOptions(c.frameOptions);
          if (c.shadow !== undefined) setShadow(c.shadow);
          if (c.shadowColor) setShadowColor(c.shadowColor);
          if (c.shadowBlur !== undefined) setShadowBlur(c.shadowBlur);
          if (c.borderRadius !== undefined) setBorderRadius(c.borderRadius);
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
            const [, queryString] = qr.data.split('?');
            if (!queryString) break;
            const params = new URLSearchParams(queryString);
            const pa = params.get('pa');
            if (pa) setUpiID(pa);
            const pn = params.get('pn');
            if (pn) setUpiName(pn);
            const am = params.get('am');
            if (am) setUpiAmount(am);
            const tn = params.get('tn');
            if (tn) setUpiNote(tn);
            break;
          }
        }

        message.success('QR Code loaded for editing');
      } catch (err: any) {
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
        const trimmedUpiId = upiID.trim();
        if (!trimmedUpiId) return '';
        const params = new URLSearchParams();
        params.set('pa', trimmedUpiId);
        if (upiName.trim()) params.set('pn', upiName.trim());
        if (upiAmount.trim()) params.set('am', upiAmount.trim());
        params.set('cu', 'INR');
        if (upiNote.trim()) params.set('tn', upiNote.trim());
        return `upi://pay?${params.toString()}`;
      }
      case 'instagram':
        return `https://instagram.com/${socialUsername}`;
      case 'facebook':
        return `https://facebook.com/${socialUsername}`;
      case 'youtube':
        return `https://youtube.com/${socialUsername}`;
      case 'whatsapp': {
        const msg = whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : '';
        return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}${msg}`;
      }
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardLastName};${vcardFirstName}\nFN:${vcardFirstName} ${vcardLastName}\nORG:${vcardOrganization}\nTITLE:${vcardTitle}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardWebsite}\nADR:${vcardAddress}\nEND:VCARD`;
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

      const qrType = ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'location', 'upi', 'vcard', 'instagram', 'facebook', 'youtube', 'whatsapp'].includes(selectedTemplate.type) 
        ? selectedTemplate.type as 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp'
        : 'text';

      const qrPayload = {
        title,
        data,
        type: qrType,
        customization: {
          qrColor,
          qrColorGradient,
          bgColor,
          bgColorGradient,
          bgImage,
          bgImageOpacity,
          qrSize,
          errorLevel,
          dotStyle,
          cornerSquareStyle,
          cornerDotStyle,
          logo,
          logoSize,
          logoPadding,
          removeBackground,
          margin,
          frameOptions,
          shadow,
          shadowColor,
          shadowBlur,
          borderRadius,
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

  const handleApplyDesignTemplate = (template: DesignTemplate) => {
    setQrColor(template.settings.qrColor);
    setQrColorGradient(template.settings.qrColorGradient);
    setBgColor(template.settings.bgColor);
    setBgColorGradient(template.settings.bgColorGradient);
    setDotStyle(template.settings.dotStyle);
    setCornerSquareStyle(template.settings.cornerSquareStyle);
    setCornerDotStyle(template.settings.cornerDotStyle);
    setFrameOptions(template.settings.frameOptions);
    setShadow(template.settings.shadow);
    setShadowColor(template.settings.shadowColor);
    setShadowBlur(template.settings.shadowBlur);
    setBorderRadius(template.settings.borderRadius);
    setMargin(template.settings.margin);
    message.success(`Applied ${template.name} template!`);
  };

  const handleNext = () => {
    if (currentStep === 0 && !selectedTemplate) {
      message.warning('Please select a QR type');
      return;
    }
    if (currentStep === 2 && (!title || !generateQRData())) {
      message.warning('Please fill in all required fields');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const customizationTabs = CustomizationTabs({
    qrColor,
    setQrColor,
    qrColorGradient,
    setQrColorGradient,
    bgColor,
    setBgColor,
    bgColorGradient,
    setBgColorGradient,
    bgImage,
    setBgImage,
    bgImageOpacity,
    setBgImageOpacity,
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
    margin,
    setMargin,
    frameOptions,
    setFrameOptions,
    shadow,
    setShadow,
    shadowColor,
    setShadowColor,
    shadowBlur,
    setShadowBlur,
    borderRadius,
    setBorderRadius,
  });

  return (
    <AppLayout>
      {fetchingQR ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Spin size="large" tip="Loading QR Code..." />
        </div>
      ) : (
        <div style={{ margin: '0 auto' }}>
          <Button
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate('/dashboard')}
            style={{ marginBottom: 16 }}
          >
            Back to Dashboard
          </Button>

          {/* Page Header */}
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              {isEditMode ? 'Edit QR Code' : 'Create QR Code'}
            </Title>
          </div>

          <Row gutter={[32, 32]}>
            {/* Left Column - Step-based Form */}
            <Col xs={24} lg={14}>
              <Card
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                }}
                bodyStyle={{ padding: 24 }}
              >
                {/* Steps Indicator */}
                <Steps
                  current={currentStep}
                  onChange={setCurrentStep}
                  style={{ marginBottom: 32 }}
                  items={[
                    { title: 'QR Type' },
                    { title: 'Design Template' },
                    { title: 'Content' },
                    { title: 'Customize' },
                  ]}
                />

                {/* Step Content */}
                <div style={{ minHeight: '400px' }}>
                  {/* Step 1: QR Type Selection */}
                  {currentStep === 0 && (
                    <div>
                      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                        Choose QR Type {isEditMode && <Text type="secondary" style={{ fontSize: 14, fontWeight: 400 }}>(Cannot be changed)</Text>}
                      </Title>
                      <div style={{ opacity: isEditMode ? 0.6 : 1, pointerEvents: isEditMode ? 'none' : 'auto' }}>
                        <TemplateSelection
                          selectedTemplate={selectedTemplate}
                          onTemplateSelect={setSelectedTemplate}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Design Template Selection */}
                  {currentStep === 1 && (
                    <div>
                      <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                        Choose Design Template
                      </Title>
                      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                        Optional: Pick a pre-designed template to apply professional styling instantly
                      </Text>
                      <DesignTemplateSelection onTemplateSelect={handleApplyDesignTemplate} />
                    </div>
                  )}

                  {/* Step 3: Content Entry */}
                  {currentStep === 2 && (
                    <div>
                      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                        Enter Content
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
                            socialUsername={socialUsername}
                            setSocialUsername={setSocialUsername}
                            whatsappNumber={whatsappNumber}
                            setWhatsappNumber={setWhatsappNumber}
                            whatsappMessage={whatsappMessage}
                            setWhatsappMessage={setWhatsappMessage}
                            vcardFirstName={vcardFirstName}
                            setVcardFirstName={setVcardFirstName}
                            vcardLastName={vcardLastName}
                            setVcardLastName={setVcardLastName}
                            vcardOrganization={vcardOrganization}
                            setVcardOrganization={setVcardOrganization}
                            vcardTitle={vcardTitle}
                            setVcardTitle={setVcardTitle}
                            vcardPhone={vcardPhone}
                            setVcardPhone={setVcardPhone}
                            vcardEmail={vcardEmail}
                            setVcardEmail={setVcardEmail}
                            vcardWebsite={vcardWebsite}
                            setVcardWebsite={setVcardWebsite}
                            vcardAddress={vcardAddress}
                            setVcardAddress={setVcardAddress}
                          />
                        </div>
                        <div>
                          <Text strong style={{ marginBottom: 8, display: 'block' }}>
                             Format
                          </Text>
                          <Segmented
                            options={[
                              { label: 'PNG', value: 'png' },
                              { label: 'SVG', value: 'svg' },
                              { label: 'JPEG', value: 'jpeg' },
                            ]}
                            value={downloadFormat}
                            onChange={(value) => setDownloadFormat(value as 'png' | 'svg' | 'jpeg')}
                            block
                            size="large"
                          />
                        </div>
                      </Space>
                    </div>
                  )}

                  {/* Step 4: Customization */}
                  {currentStep === 3 && (
                    <div>
                      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                        Customize Design
                      </Title>
                      <Tabs items={customizationTabs} />
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    size="large"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  {currentStep < 3 ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleNext}
                      style={{
                        background: '#6366f1',
                        borderColor: '#6366f1',
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      loading={loading}
                      onClick={handleSaveQR}
                      style={{
                        background: '#10b981',
                        borderColor: '#10b981',
                      }}
                    >
                      {isEditMode ? 'Update QR Code' : 'Save QR Code'}
                    </Button>
                  )}
                </div>
              </Card>
            </Col>

            {/* Right Column - Preview (Always Visible) */}
            <Col xs={24} lg={10}>
              <QRPreview
                qrData={generateQRData() || 'https://example.com'}
                qrColor={qrColor}
                qrColorGradient={qrColorGradient}
                bgColor={bgColor}
                bgColorGradient={bgColorGradient}
                bgImage={bgImage}
                bgImageOpacity={bgImageOpacity}
                qrSize={qrSize}
                errorLevel={errorLevel}
                dotStyle={dotStyle}
                cornerSquareStyle={cornerSquareStyle}
                cornerDotStyle={cornerDotStyle}
                logo={logo}
                logoSize={logoSize}
                logoPadding={logoPadding}
                removeBackground={removeBackground}
                margin={margin}
                frameOptions={frameOptions}
                shadow={shadow}
                shadowColor={shadowColor}
                shadowBlur={shadowBlur}
                borderRadius={borderRadius}
                title={title}
                loading={loading}
                onSave={handleSaveQR}
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
