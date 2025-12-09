export interface Scan {
  _id: string;
  qrCode: string;
  browser: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  device: {
    type?: string;
    vendor?: string;
    model?: string;
  };
  ip: string;
  userAgent: string;
  location: {
    country?: string;
    countryCode?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  referrer?: string;
  scannedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QRCode {
  _id: string;
  user: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi';
  data: string;
  title: string;
  scanCount: number;
  isActive: boolean;
  customization?: {
    qrColor: string;
    bgColor: string;
    qrSize: number;
    errorLevel: 'L' | 'M' | 'Q' | 'H';
    dotStyle: string;
    cornerSquareStyle: string;
    cornerDotStyle: string;
    logo: string | null;
    logoSize: number;
    logoPadding: number;
    removeBackground: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalScans: number;
  analytics: {
    browsers: Record<string, number>;
    os: Record<string, number>;
    devices: Record<string, number>;
    countries: Record<string, number>;
    scansByDate: Record<string, number>;
  };
}
