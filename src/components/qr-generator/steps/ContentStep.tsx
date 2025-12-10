import { Typography, Space, Input, Segmented } from 'antd';
import ContentForm from '../ContentFormNew';
import type { QRTemplate } from '../templates';

const { Text } = Typography;

interface ContentStepProps {
  selectedTemplate: QRTemplate;
  title: string;
  setTitle: (value: string) => void;
  downloadFormat: 'png' | 'svg' | 'jpeg';
  setDownloadFormat: (value: 'png' | 'svg' | 'jpeg') => void;
  // Content fields props
  qrData: string;
  setQrData: (value: string) => void;
  emailTo: string;
  setEmailTo: (value: string) => void;
  emailSubject: string;
  setEmailSubject: (value: string) => void;
  emailBody: string;
  setEmailBody: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  smsNumber: string;
  setSmsNumber: (value: string) => void;
  smsMessage: string;
  setSmsMessage: (value: string) => void;
  wifiSSID: string;
  setWifiSSID: (value: string) => void;
  wifiPassword: string;
  setWifiPassword: (value: string) => void;
  wifiEncryption: string;
  setWifiEncryption: (value: string) => void;
  latitude: string;
  setLatitude: (value: string) => void;
  longitude: string;
  setLongitude: (value: string) => void;
  upiID: string;
  setUpiID: (value: string) => void;
  upiName: string;
  setUpiName: (value: string) => void;
  upiAmount: string;
  setUpiAmount: (value: string) => void;
  upiNote: string;
  setUpiNote: (value: string) => void;
  socialUsername: string;
  setSocialUsername: (value: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  whatsappMessage: string;
  setWhatsappMessage: (value: string) => void;
  vcardFirstName: string;
  setVcardFirstName: (value: string) => void;
  vcardLastName: string;
  setVcardLastName: (value: string) => void;
  vcardOrganization: string;
  setVcardOrganization: (value: string) => void;
  vcardTitle: string;
  setVcardTitle: (value: string) => void;
  vcardPhone: string;
  setVcardPhone: (value: string) => void;
  vcardEmail: string;
  setVcardEmail: (value: string) => void;
  vcardWebsite: string;
  setVcardWebsite: (value: string) => void;
  vcardAddress: string;
  setVcardAddress: (value: string) => void;
}

const ContentStep = (props: ContentStepProps) => {
  const {
    selectedTemplate,
    title,
    setTitle,
    downloadFormat,
    setDownloadFormat,
    ...contentFormProps
  } = props;

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        Enter Content
      </Typography.Title>
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
            {...contentFormProps}
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
  );
};

export default ContentStep;
