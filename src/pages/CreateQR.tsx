import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Row, Col, Button, Steps, Space } from 'antd';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { templates } from '../components/qr-generator/templates';
import type { QRTemplate } from '../components/qr-generator/templates';
import QRPreview from '../components/qr-generator/QRPreviewNew';
import { QRTypeStep, DesignTemplateStep, ContentStep, CustomizationStep } from '../components/qr-generator/steps';
import { useQRContent } from '../hooks/useQRContent';
import { useQRDesign } from '../hooks/useQRDesign';
import { useQRManager } from '../hooks/useQRManager';
import { generateQRData } from '../utils/qrDataGenerator';
import CardTemplateGallery from '../components/templates/CardTemplateGallery';
import CardEditor from '../components/templates/CardEditor';

const { Title } = Typography;

const CreateQR = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>(templates[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCardTemplate, setSelectedCardTemplate] = useState<any>(null);

  const contentState = useQRContent();
  const designState = useQRDesign();

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
    whatsappNumber: contentState.whatsappNumber || '',
    whatsappMessage: contentState.whatsappMessage || '',
    vcardFirstName: contentState.vcardFirstName || '',
    vcardLastName: contentState.vcardLastName || '',
    vcardPhone: contentState.vcardPhone,
    vcardEmail: contentState.vcardEmail,
    vcardWebsite: contentState.vcardWebsite,
    vcardAddress: contentState.vcardAddress,
    vcardOrganization: contentState.vcardOrganization || '',
    vcardTitle: contentState.vcardTitle || ''
  });

  const qrManager = useQRManager({
    id,
    contentState,
    designState,
    selectedTemplate,
    setSelectedTemplate,
    generateQRDataFn,
  });

  const steps = [
    { title: 'Card Template', description: 'Choose card design (Optional)' },
    { title: 'QR Type', description: 'Choose QR code type' },
    { title: 'Content', description: 'Enter your content' },
    { title: 'QR Design', description: 'Customize QR appearance' },
    { title: 'Final Touch', description: 'Fine-tune everything' }
  ];



  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipCardTemplate = () => {
    setSelectedCardTemplate(null);
    handleNext();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            {!selectedCardTemplate ? (
              <div>
              
                <CardTemplateGallery
                  onSelectTemplate={(template) => {
                    setSelectedCardTemplate(template);
                  }}
                  selectedTemplateId={selectedCardTemplate?.id}
                />
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'center' }}>
                  <Title level={4}>Customize Your Card Template</Title>
                  <p>Click on any text to edit it. Customize colors and styling.</p>
                  <Button onClick={() => setSelectedCardTemplate(null)}>
                    Change Template
                  </Button>
                </div>
                <CardEditor
                  template={selectedCardTemplate}
                  qrData={generateQRDataFn() || 'https://example.com'}
                  qrCustomization={designState}
                  onTemplateChange={setSelectedCardTemplate}
                />
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <QRTypeStep
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            isEditMode={!!id}
          />
        );
      case 2:
        return (
          <ContentStep
            selectedTemplate={selectedTemplate}
 
            title={contentState.title}
            setTitle={contentState.setTitle}
            qrData={contentState.qrData}
            setQrData={contentState.setQrData}
            emailTo={contentState.emailTo}
            setEmailTo={contentState.setEmailTo}
            emailSubject={contentState.emailSubject}
            setEmailSubject={contentState.setEmailSubject}
            emailBody={contentState.emailBody}
            setEmailBody={contentState.setEmailBody}
            phoneNumber={contentState.phoneNumber}
            setPhoneNumber={contentState.setPhoneNumber}
            smsNumber={contentState.smsNumber}
            setSmsNumber={contentState.setSmsNumber}
            smsMessage={contentState.smsMessage}
            setSmsMessage={contentState.setSmsMessage}
            wifiSSID={contentState.wifiSSID}
            setWifiSSID={contentState.setWifiSSID}
            wifiPassword={contentState.wifiPassword}
            setWifiPassword={contentState.setWifiPassword}
            wifiEncryption={contentState.wifiEncryption}
            setWifiEncryption={contentState.setWifiEncryption}
            latitude={contentState.latitude}
            setLatitude={contentState.setLatitude}
            longitude={contentState.longitude}
            setLongitude={contentState.setLongitude}
            upiID={contentState.upiID}
            setUpiID={contentState.setUpiID}
            upiName={contentState.upiName}
            setUpiName={contentState.setUpiName}
            upiAmount={contentState.upiAmount}
            setUpiAmount={contentState.setUpiAmount}
            upiNote={contentState.upiNote}
            setUpiNote={contentState.setUpiNote}
            socialUsername={contentState.socialUsername}
            setSocialUsername={contentState.setSocialUsername}
            whatsappNumber={contentState.whatsappNumber || ''}
            setWhatsappNumber={contentState.setWhatsappNumber}
            whatsappMessage={contentState.whatsappMessage || ''}
            setWhatsappMessage={contentState.setWhatsappMessage}
            vcardFirstName={contentState.vcardFirstName || ''}
            setVcardFirstName={contentState.setVcardFirstName}
            vcardLastName={contentState.vcardLastName || ''}
            setVcardLastName={contentState.setVcardLastName}
            vcardPhone={contentState.vcardPhone}
            setVcardPhone={contentState.setVcardPhone}
            vcardEmail={contentState.vcardEmail}
            setVcardEmail={contentState.setVcardEmail}
            vcardWebsite={contentState.vcardWebsite}
            setVcardWebsite={contentState.setVcardWebsite}
            vcardAddress={contentState.vcardAddress}
            setVcardAddress={contentState.setVcardAddress}
            vcardOrganization={contentState.vcardOrganization || ''}
            setVcardOrganization={contentState.setVcardOrganization}
            vcardTitle={contentState.vcardTitle || ''}
            setVcardTitle={contentState.setVcardTitle}
          />
        );
      case 3:
        return (
          <DesignTemplateStep
            onTemplateSelect={(template: any) => designState.applyDesignTemplate(template.settings)}
          />
        );
      case 4:
        return (
          <CustomizationStep
            qrColor={designState.qrColor}
            setQrColor={designState.setQrColor}
            qrColorGradient={designState.qrColorGradient}
            setQrColorGradient={designState.setQrColorGradient}
            bgColor={designState.bgColor}
            setBgColor={designState.setBgColor}
            bgColorGradient={designState.bgColorGradient}
            setBgColorGradient={designState.setBgColorGradient}
            bgImage={designState.bgImage}
            setBgImage={designState.setBgImage}
            bgImageOpacity={designState.bgImageOpacity}
            setBgImageOpacity={designState.setBgImageOpacity}
            qrSize={designState.qrSize}
            setQrSize={designState.setQrSize}
            errorLevel={designState.errorLevel}
            setErrorLevel={designState.setErrorLevel}
            dotStyle={designState.dotStyle}
            setDotStyle={designState.setDotStyle}
            cornerSquareStyle={designState.cornerSquareStyle}
            setCornerSquareStyle={designState.setCornerSquareStyle}
            cornerDotStyle={designState.cornerDotStyle}
            setCornerDotStyle={designState.setCornerDotStyle}
            logo={designState.logo}
            setLogo={designState.setLogo}
            logoSize={designState.logoSize}
            setLogoSize={designState.setLogoSize}
            logoPadding={designState.logoPadding}
            setLogoPadding={designState.setLogoPadding}
            removeBackground={designState.removeBackground}
            setRemoveBackground={designState.setRemoveBackground}
            margin={designState.margin}
            setMargin={designState.setMargin}
            frameOptions={designState.frameOptions}
            setFrameOptions={designState.setFrameOptions}
            shadow={designState.shadow}
            setShadow={designState.setShadow}
            shadowColor={designState.shadowColor}
            setShadowColor={designState.setShadowColor}
            shadowBlur={designState.shadowBlur}
            setShadowBlur={designState.setShadowBlur}
            borderRadius={designState.borderRadius}
            setBorderRadius={designState.setBorderRadius}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 2:
        return !contentState.qrData?.trim() && !generateQRDataFn();
      default:
        return false;
    }
  };

  return (
    <AppLayout>
      <div style={{ margin: '0 auto'}}>
        <Button
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/dashboard')}
          style={{ marginBottom: 16 }}
        >
          Back to Dashboard
        </Button>

        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            {id ? 'Edit QR Code' : 'Create QR Code'}
          </Title>
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <Card>
              <Steps 
                current={currentStep} 
                style={{ marginBottom: 32 }}
                items={steps.map((step, index) => ({
                  key: index,
                  title: step.title,
                  description: step.description
                }))}
              />

              <div style={{ minHeight: 400 }}>
                {renderStepContent()}
              </div>

              <Row justify="space-between" style={{ marginTop: 32 }}>
                <Col>
                  {currentStep > 0 && (
                    <Button onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                </Col>
                <Col>
                  <Space>
                    {currentStep === 0 && (
                      <Button onClick={handleSkipCardTemplate}>
                        Skip Cards
                      </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <Button 
                        type="primary" 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        type="primary"
                        onClick={qrManager.handleSaveQR}
                        loading={qrManager.loading}
                      >
                        {id ? 'Update QR Code' : 'Save QR Code'}
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={8}>
            <div style={{ position: 'sticky', top: 24 }}>
              {selectedCardTemplate ? (
                <CardEditor
                  template={selectedCardTemplate}
                  qrData={generateQRDataFn()}
                  qrCustomization={designState}
                  onTemplateChange={setSelectedCardTemplate}
                />
              ) : (
                <QRPreview
                  qrData={generateQRDataFn()}
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
                  loading={qrManager.loading}
                  onSave={qrManager.handleSaveQR}
                  saveButtonText={id ? 'Update QR Code' : 'Save QR Code'}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default CreateQR;
