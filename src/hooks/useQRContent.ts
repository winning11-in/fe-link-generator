import { useState } from 'react';

export const useQRContent = () => {
  const [title, setTitle] = useState('');
  const [qrData, setQrData] = useState('');

  // Email fields
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Phone & SMS fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  // WiFi fields
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  // Location fields
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // UPI fields
  const [upiID, setUpiID] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');

  // Social media fields
  const [socialUsername, setSocialUsername] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // vCard fields
  const [vcardFirstName, setVcardFirstName] = useState('');
  const [vcardLastName, setVcardLastName] = useState('');
  const [vcardOrganization, setVcardOrganization] = useState('');
  const [vcardTitle, setVcardTitle] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardWebsite, setVcardWebsite] = useState('');
  const [vcardAddress, setVcardAddress] = useState('');

  return {
    title,
    setTitle,
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
  };
};
