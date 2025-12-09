import { Input, Space, Select } from 'antd';
import { Link as LinkIcon, Mail, Phone, MessageSquare, Wifi, MapPin, IndianRupee } from 'lucide-react';

const { TextArea } = Input;

interface ContentFormProps {
  templateType: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi';
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
}

const ContentForm = ({
  templateType,
  qrData,
  setQrData,
  emailTo,
  setEmailTo,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
  phoneNumber,
  setPhoneNumber,
  smsNumber,
  setSmsNumber,
  smsMessage,
  setSmsMessage,
  wifiSSID,
  setWifiSSID,
  wifiPassword,
  setWifiPassword,
  wifiEncryption,
  setWifiEncryption,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  upiID,
  setUpiID,
  upiName,
  setUpiName,
  upiAmount,
  setUpiAmount,
  upiNote,
  setUpiNote,
}: ContentFormProps) => {
  switch (templateType) {
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
    case 'upi':
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="UPI ID (e.g., yourname@paytm)"
            value={upiID}
            onChange={(e) => setUpiID(e.target.value)}
            prefix={<IndianRupee size={18} />}
          />
          <Input
            size="large"
            placeholder="Payee Name (optional)"
            value={upiName}
            onChange={(e) => setUpiName(e.target.value)}
          />
          <Input
            size="large"
            placeholder="Amount (optional, e.g., 100.00)"
            type="number"
            value={upiAmount}
            onChange={(e) => setUpiAmount(e.target.value)}
          />
          <Input
            size="large"
            placeholder="Note/Description (optional)"
            value={upiNote}
            onChange={(e) => setUpiNote(e.target.value)}
          />
        </Space>
      );
    default:
      return null;
  }
};

export default ContentForm;
