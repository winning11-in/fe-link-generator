export interface CardTemplate {
  id: string;
  name: string;
  category: 'business' | 'eco' | 'tech' | 'modern' | 'minimal' | 'creative';
  preview: string;
  settings: {
    width: number;
    height: number;
    backgroundColor: string;
    backgroundImage?: string;
    gradient?: {
      type: 'linear' | 'radial';
      colors: string[];
      direction?: string;
    };
    padding: number;
    borderRadius: number;
    shadow: boolean;
    shadowColor: string;
    shadowBlur: number;
    shadowOffset: { x: number; y: number };
  };
  elements: CardElement[];
}

export interface CardElement {
  id: string;
  type: 'text' | 'qrcode' | 'image' | 'shape' | 'icon';
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  rotation?: number;
  opacity?: number;
  // Text specific
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  // QR specific
  qrSettings?: {
    errorLevel: 'L' | 'M' | 'Q' | 'H';
    margin: number;
    cornerRadius: number;
  };
  // Image/Icon specific
  src?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  // Shape specific
  shapeType?: 'rectangle' | 'circle' | 'triangle';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  // Animation
  animation?: {
    type: 'none' | 'fade' | 'slide' | 'scale';
    duration: number;
    delay: number;
  };
}

export interface CardCustomization {
  templateId: string;
  elements: Record<string, Partial<CardElement>>;
  settings: Partial<CardTemplate['settings']>;
}

export interface CardPreset {
  id: string;
  name: string;
  description: string;
  templateId: string;
  customization: CardCustomization;
  tags: string[];
}