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

// Card Template Configuration
export interface QRTemplate {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  title: string;
  subtitle: string;
  /** Optional additional content elements rendered on the template */
  elements?: QRTemplateElement[];
  titleFontSize?: number;
  subtitleFontSize?: number;
  titleFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  subtitleFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  qrPosition?: 'bottom' | 'center' | 'top';
  borderRadius?: number;
  showGradient?: boolean;
  gradientColor?: string;
  gradientDirection?: 'to-bottom' | 'to-right' | 'to-bottom-right' | 'to-top-right';
  padding?: number;
  titleLetterSpacing?: number;
  subtitleLetterSpacing?: number;
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: number;
  shadowIntensity?: 'none' | 'light' | 'medium' | 'strong';
  decorativeStyle?: 'none' | 'circles' | 'dots' | 'lines' | 'geometric';
  accentColor?: string;
}

// Optional elements that can be added to a template (text blocks, logos, etc.)
export interface QRTemplateElement {
  id: string;
  type?: 'text' | 'logo';
  text?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  letterSpacing?: number;
  opacity?: number;
  textAlign?: 'left' | 'center' | 'right';
}

// QR Code Styling
export interface QRStyling {
  fgColor: string;
  bgColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  // Advanced styling extended support
  dotStyle?: 'square' | 'rounded' | 'dots';
  cornerStyle?: 'square' | 'dot' | 'extra-rounded';
  dotScale?: number;
  fgGradient?: {
    enabled?: boolean;
    type?: 'linear' | 'radial';
    color1?: string;
    color2?: string;
    direction?: 'to-bottom' | 'to-right' | 'to-bottom-right' | 'to-top-right';
  };
  image?: {
    url?: string | null;
    size?: number;
    margin?: number;
  };
}

export interface QRCode {
  _id: string;
  user: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  content: string;
  name: string;
  scanCount: number;
  status: 'active' | 'inactive';
  previewImage?: string;
  template?: QRTemplate;
  styling?: QRStyling;
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
