import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Row, Col, Button, message, Spin, Steps } from 'antd';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { templates } from '../components/qr-generator/templates';
import type { QRTemplate } from '../components/qr-generator/templates';
import QRPreview from '../components/qr-generator/QRPreviewNew';
import type { DesignTemplate } from '../components/qr-generator/designTemplates';
import { QRTypeStep, DesignTemplateStep, ContentStep, CustomizationStep } from '../components/qr-generator/steps';
import { useQRContent } from '../hooks/useQRContent';
import { useQRDesign } from '../hooks/useQRDesign';
import { useQRManager } from '../hooks/useQRManager';
import { generateQRData } from '../utils/qrDataGenerator';

const { Title } = Typography;

const CreateQR = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Template and step state
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>(templates[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'jpeg'>('png');

  // Custom hooks for state management
  const contentState = useQRContent();
  const designState = useQRDesign();

  // Generate QR data function
  const generateQRDataFn = () => generateQRData({
    templateType: selectedTemplate.type,
    qrData: contentState.qrData,
    emailTo: contentState.emailTo,
    emailSubject: contentState.emailSubject,
    emailBody: contentState.emailBody,
    phoneNumber: contentState.phoneNumber,
    smsNumber: contentState.smsNumber,
    smsMessage: contentState.smsMessage,
    wifiSSID: contentState.wifiSSID,
    wifiPassword: contentState.wifiPassword,
    wifiEncryption: contentState.wifiEncryption,
    latitude: contentState.latitude,
    longitude: contentState.longitude,
    upiID: contentState.upiID,
    upiName: contentState.upiName,
    upiAmount: contentState.upiAmount,
    upiNote: contentState.upiNote,
    socialUsername: contentState.socialUsername,
    whatsappNumber: contentState.whatsappNumber,
    whatsappMessage: contentState.whatsappMessage,
    vcardFirstName: contentState.vcardFirstName,
    vcardLastName: contentState.vcardLastName,
    vcardOrganization: contentState.vcardOrganization,
    vcardTitle: contentState.vcardTitle,
    vcardPhone: contentState.vcardPhone,
    vcardEmail: contentState.vcardEmail,
    vcardWebsite: contentState.vcardWebsite,
    vcardAddress: contentState.vcardAddress,
  });

  // QR Manager hook for loading and saving
  const { loading, fetchingQR, isEditMode, handleSaveQR } = useQRManager({
    id,
    contentState,
    designState,
    selectedTemplate,
    setSelectedTemplate,
    generateQRDataFn,
  });

  const handleApplyDesignTemplate = (template: DesignTemplate) => {
    designState.applyDesignTemplate(template.settings);
    message.success(`Applied ${template.name} template!`);
  };

  const handleNext = () => {
    if (currentStep === 0 && !selectedTemplate) {
      message.warning('Please select a QR type');
      return;
    }
    if (currentStep === 2 && (!contentState.title || !generateQRDataFn())) {
      message.warning('Please fill in all required fields');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

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
                    <QRTypeStep
                      selectedTemplate={selectedTemplate}
                      onTemplateSelect={setSelectedTemplate}
                      isEditMode={isEditMode}
                    />
                  )}

                  {/* Step 2: Design Template Selection */}
                  {currentStep === 1 && (
                    <DesignTemplateStep onTemplateSelect={handleApplyDesignTemplate} />
                  )}

                  {/* Step 3: Content Entry */}
                  {currentStep === 2 && (
                    <ContentStep
                      selectedTemplate={selectedTemplate}
                      downloadFormat={downloadFormat}
                      setDownloadFormat={setDownloadFormat}
                      {...contentState}
                    />
                  )}

                  {/* Step 4: Customization */}
                  {currentStep === 3 && (
                    <CustomizationStep {...designState} />
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
                qrData={generateQRDataFn() || 'https://example.com'}
                qrColor={designState.qrColor}
                qrColorGradient={designState.qrColorGradient}
                bgColor={designState.bgColor}
                bgColorGradient={designState.bgColorGradient}
                bgImage={designState.bgImage}
                bgImageOpacity={designState.bgImageOpacity}
                qrSize={designState.qrSize}
                errorLevel={designState.errorLevel}
                dotStyle={designState.dotStyle}
                cornerSquareStyle={designState.cornerSquareStyle}
                cornerDotStyle={designState.cornerDotStyle}
                logo={designState.logo}
                logoSize={designState.logoSize}
                logoPadding={designState.logoPadding}
                removeBackground={designState.removeBackground}
                margin={designState.margin}
                frameOptions={designState.frameOptions}
                shadow={designState.shadow}
                shadowColor={designState.shadowColor}
                shadowBlur={designState.shadowBlur}
                borderRadius={designState.borderRadius}
                title={contentState.title}
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
