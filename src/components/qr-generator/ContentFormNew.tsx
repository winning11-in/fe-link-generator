import { Input, Space, Select } from 'antd';
import { Link as LinkIcon, Mail, Phone, MessageSquare, Wifi, MapPin, IndianRupee, Instagram, Facebook, Youtube, MessageCircle, UserCircle } from 'lucide-react';

const { TextArea } = Input;

interface ContentFormProps {
  templateType: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
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
  // Social media fields
  socialUsername: string;
  setSocialUsername: (value: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  whatsappMessage: string;
  setWhatsappMessage: (value: string) => void;
  // vCard fields
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

const ContentForm = (props: ContentFormProps) => {
  const {
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
    socialUsername,
    setSocialUsername,
    whatsappNumber,
    setWhatsappNumber,
    whatsappMessage,
    setWhatsappMessage,
    vcardFirstName,
    setVcardFirstName,
    vcardLastName,
    setVcardLastName,
    vcardOrganization,
    setVcardOrganization,
    vcardTitle,
    setVcardTitle,
    vcardPhone,
    setVcardPhone,
    vcardEmail,
    setVcardEmail,
    vcardWebsite,
    setVcardWebsite,
    vcardAddress,
    setVcardAddress,
  } = props;

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
    
    case 'instagram':
      return (
        <Input
          size="large"
          placeholder="username"
          value={socialUsername}
          onChange={(e) => setSocialUsername(e.target.value)}
          prefix={<Instagram size={18} />}
          addonBefore="instagram.com/"
        />
      );
    
    case 'facebook':
      return (
        <Input
          size="large"
          placeholder="username or page"
          value={socialUsername}
          onChange={(e) => setSocialUsername(e.target.value)}
          prefix={<Facebook size={18} />}
          addonBefore="facebook.com/"
        />
      );
    
    case 'youtube':
      return (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="channel ID or @username"
            value={socialUsername}
            onChange={(e) => setSocialUsername(e.target.value)}
            prefix={<Youtube size={18} />}
            addonBefore="youtube.com/"
          />
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            Enter channel ID (e.g., UCxxxxxx) or @username
          </span>
        </Space>
      );
    
    case 'whatsapp':
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="+1234567890 (with country code)"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            prefix={<MessageCircle size={18} />}
          />
          <TextArea
            placeholder="Pre-filled message (optional)"
            value={whatsappMessage}
            onChange={(e) => setWhatsappMessage(e.target.value)}
            rows={3}
          />
        </Space>
      );
    
    case 'vcard':
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="First Name"
              value={vcardFirstName}
              onChange={(e) => setVcardFirstName(e.target.value)}
              prefix={<UserCircle size={18} />}
              style={{ flex: 1 }}
            />
            <Input
              size="large"
              placeholder="Last Name"
              value={vcardLastName}
              onChange={(e) => setVcardLastName(e.target.value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Input
            size="large"
            placeholder="Organization"
            value={vcardOrganization}
            onChange={(e) => setVcardOrganization(e.target.value)}
          />
          <Input
            size="large"
            placeholder="Job Title"
            value={vcardTitle}
            onChange={(e) => setVcardTitle(e.target.value)}
          />
          <Input
            size="large"
            placeholder="Phone Number"
            value={vcardPhone}
            onChange={(e) => setVcardPhone(e.target.value)}
            prefix={<Phone size={18} />}
          />
          <Input
            size="large"
            placeholder="Email"
            value={vcardEmail}
            onChange={(e) => setVcardEmail(e.target.value)}
            prefix={<Mail size={18} />}
          />
          <Input
            size="large"
            placeholder="Website (optional)"
            value={vcardWebsite}
            onChange={(e) => setVcardWebsite(e.target.value)}
            prefix={<LinkIcon size={18} />}
          />
          <TextArea
            placeholder="Address (optional)"
            value={vcardAddress}
            onChange={(e) => setVcardAddress(e.target.value)}
            rows={2}
          />
        </Space>
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
            onChange={(e) => setEmailBody(e.target.value)}
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
            onChange={(e) => setSmsMessage(e.target.value)}
            rows={4}
          />
        </Space>
      );
    
    case 'text':
      return (
        <TextArea
          placeholder="Enter your text here..."
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
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
