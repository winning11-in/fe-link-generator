type QRContentData = {
  templateType: string;
  qrData: string;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  phoneNumber: string;
  smsNumber: string;
  smsMessage: string;
  wifiSSID: string;
  wifiPassword: string;
  wifiEncryption: string;
  latitude: string;
  longitude: string;
  upiID: string;
  upiName: string;
  upiAmount: string;
  upiNote: string;
  socialUsername: string;
  whatsappNumber: string;
  whatsappMessage: string;
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrganization: string;
  vcardTitle: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardWebsite: string;
  vcardAddress: string;
};

export const generateQRData = (data: QRContentData): string => {
  switch (data.templateType) {
    case 'url':
      return data.qrData;
    case 'email':
      return `mailto:${data.emailTo}?subject=${encodeURIComponent(data.emailSubject)}&body=${encodeURIComponent(data.emailBody)}`;
    case 'phone':
      return `tel:${data.phoneNumber}`;
    case 'sms':
      return `sms:${data.smsNumber}?body=${encodeURIComponent(data.smsMessage)}`;
    case 'text':
      return data.qrData;
    case 'wifi':
      return `WIFI:T:${data.wifiEncryption};S:${data.wifiSSID};P:${data.wifiPassword};;`;
    case 'location':
      return `geo:${data.latitude},${data.longitude}`;
    case 'upi': {
      const trimmedUpiId = data.upiID.trim();
      if (!trimmedUpiId) return '';
      const params = new URLSearchParams();
      params.set('pa', trimmedUpiId);
      if (data.upiName.trim()) params.set('pn', data.upiName.trim());
      if (data.upiAmount.trim()) params.set('am', data.upiAmount.trim());
      params.set('cu', 'INR');
      if (data.upiNote.trim()) params.set('tn', data.upiNote.trim());
      return `upi://pay?${params.toString()}`;
    }
    case 'instagram':
      return `https://instagram.com/${data.socialUsername}`;
    case 'facebook':
      return `https://facebook.com/${data.socialUsername}`;
    case 'youtube':
      return `https://youtube.com/${data.socialUsername}`;
    case 'whatsapp': {
      const msg = data.whatsappMessage ? `?text=${encodeURIComponent(data.whatsappMessage)}` : '';
      return `https://wa.me/${data.whatsappNumber.replace(/[^0-9]/g, '')}${msg}`;
    }
    case 'vcard':
      return `BEGIN:VCARD\nVERSION:3.0\nN:${data.vcardLastName};${data.vcardFirstName}\nFN:${data.vcardFirstName} ${data.vcardLastName}\nORG:${data.vcardOrganization}\nTITLE:${data.vcardTitle}\nTEL:${data.vcardPhone}\nEMAIL:${data.vcardEmail}\nURL:${data.vcardWebsite}\nADR:${data.vcardAddress}\nEND:VCARD`;
    default:
      return data.qrData;
  }
};

export const parseQRData = (qrData: string, qrType: string) => {
  const result: any = {};

  switch (qrType) {
    case 'email': {
      const emailMatch = qrData.match(/mailto:([^?]+)\?subject=([^&]*)&body=(.*)/);
      if (emailMatch) {
        result.emailTo = emailMatch[1];
        result.emailSubject = decodeURIComponent(emailMatch[2]);
        result.emailBody = decodeURIComponent(emailMatch[3]);
      }
      break;
    }
    case 'phone':
      result.phoneNumber = qrData.replace('tel:', '');
      break;
    case 'sms': {
      const smsMatch = qrData.match(/sms:([^?]+)\?body=(.*)/);
      if (smsMatch) {
        result.smsNumber = smsMatch[1];
        result.smsMessage = decodeURIComponent(smsMatch[2]);
      }
      break;
    }
    case 'wifi': {
      const wifiMatch = qrData.match(/WIFI:T:([^;]+);S:([^;]+);P:([^;]+);;/);
      if (wifiMatch) {
        result.wifiEncryption = wifiMatch[1];
        result.wifiSSID = wifiMatch[2];
        result.wifiPassword = wifiMatch[3];
      }
      break;
    }
    case 'location': {
      const locMatch = qrData.match(/geo:([^,]+),(.*)/);
      if (locMatch) {
        result.latitude = locMatch[1];
        result.longitude = locMatch[2];
      }
      break;
    }
    case 'upi': {
      const [, queryString] = qrData.split('?');
      if (queryString) {
        const params = new URLSearchParams(queryString);
        const pa = params.get('pa');
        if (pa) result.upiID = pa;
        const pn = params.get('pn');
        if (pn) result.upiName = pn;
        const am = params.get('am');
        if (am) result.upiAmount = am;
        const tn = params.get('tn');
        if (tn) result.upiNote = tn;
      }
      break;
    }
  }

  return result;
};
