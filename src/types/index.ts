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

export interface GradientColor {
  type: 'solid' | 'linear' | 'radial';
  color?: string;
  gradient?: {
    colorStops: Array<{ offset: number; color: string }>;
    rotation?: number;
  };
}

export interface FrameOptions {
  enabled: boolean;
  style: 'none' | 'basic' | 'rounded' | 'banner';
  color: string;
  text?: string;
  textColor?: string;
}

export interface QRCode {
  _id: string;
  user: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  data: string;
  title: string;
  scanCount: number;
  isActive: boolean;
  previewImage?: string;
  customization?: {
    qrColor: string;
    qrColorGradient?: GradientColor;
    bgColor: string;
    bgColorGradient?: GradientColor;
    bgImage?: string;
    bgImageOpacity?: number;
    qrSize: number;
    errorLevel: 'L' | 'M' | 'Q' | 'H';
    dotStyle: string;
    cornerSquareStyle: string;
    cornerDotStyle: string;
    logo: string | null;
    logoSize: number;
    logoPadding: number;
    removeBackground: boolean;
    margin?: number;
    frameOptions?: FrameOptions;
    shadow?: boolean;
    shadowColor?: string;
    shadowBlur?: number;
    borderRadius?: number;
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
