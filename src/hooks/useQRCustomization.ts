import { useState } from 'react';
import type { GradientColor, FrameOptions } from '../types';

export const useQRCustomization = () => {
  // Basic QR settings
  const [title, setTitle] = useState('');
  const [qrData, setQrData] = useState('');
  
  // Colors - Solid
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  // Colors - Gradients
  const [qrColorGradient, setQrColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#000000',
  });
  
  const [bgColorGradient, setBgColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#ffffff',
  });
  
  // Background Image
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgImageOpacity, setBgImageOpacity] = useState(1);
  
  // QR Settings
  const [qrSize, setQrSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  
  // Shape Settings
  const [dotStyle, setDotStyle] = useState('square');
  const [cornerSquareStyle, setCornerSquareStyle] = useState('square');
  const [cornerDotStyle, setCornerDotStyle] = useState('square');
  
  // Logo Settings
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoPadding, setLogoPadding] = useState(5);
  const [removeBackground, setRemoveBackground] = useState(true);
  
  // Spacing
  const [margin, setMargin] = useState(10);
  
  // Frame Settings
  const [frameOptions, setFrameOptions] = useState<FrameOptions>({
    enabled: false,
    style: 'none',
    color: '#000000',
    text: '',
    textColor: '#ffffff',
  });
  
  // Effects
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

  // Apply design template
  const applyDesignTemplate = (template: any) => {
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
  };

  // Load from existing QR code
  const loadFromQRCode = (qr: any) => {
    setTitle(qr.title);
    setQrData(qr.data);

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
  };

  // Get customization object for API
  const getCustomization = () => ({
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
  });

  return {
    // Basic
    title, setTitle,
    qrData, setQrData,
    
    // Colors
    qrColor, setQrColor,
    qrColorGradient, setQrColorGradient,
    bgColor, setBgColor,
    bgColorGradient, setBgColorGradient,
    bgImage, setBgImage,
    bgImageOpacity, setBgImageOpacity,
    
    // Settings
    qrSize, setQrSize,
    errorLevel, setErrorLevel,
    
    // Shapes
    dotStyle, setDotStyle,
    cornerSquareStyle, setCornerSquareStyle,
    cornerDotStyle, setCornerDotStyle,
    
    // Logo
    logo, setLogo,
    logoSize, setLogoSize,
    logoPadding, setLogoPadding,
    removeBackground, setRemoveBackground,
    
    // Spacing & Effects
    margin, setMargin,
    frameOptions, setFrameOptions,
    shadow, setShadow,
    shadowColor, setShadowColor,
    shadowBlur, setShadowBlur,
    borderRadius, setBorderRadius,
    
    // Template fields
    emailTo, setEmailTo,
    emailSubject, setEmailSubject,
    emailBody, setEmailBody,
    phoneNumber, setPhoneNumber,
    smsNumber, setSmsNumber,
    smsMessage, setSmsMessage,
    wifiSSID, setWifiSSID,
    wifiPassword, setWifiPassword,
    wifiEncryption, setWifiEncryption,
    latitude, setLatitude,
    longitude, setLongitude,
    upiID, setUpiID,
    upiName, setUpiName,
    upiAmount, setUpiAmount,
    upiNote, setUpiNote,
    socialUsername, setSocialUsername,
    whatsappNumber, setWhatsappNumber,
    whatsappMessage, setWhatsappMessage,
    vcardFirstName, setVcardFirstName,
    vcardLastName, setVcardLastName,
    vcardOrganization, setVcardOrganization,
    vcardTitle, setVcardTitle,
    vcardPhone, setVcardPhone,
    vcardEmail, setVcardEmail,
    vcardWebsite, setVcardWebsite,
    vcardAddress, setVcardAddress,
    
    // Utility functions
    applyDesignTemplate,
    loadFromQRCode,
    getCustomization,
  };
};
