import type { GradientColor, FrameOptions } from '../../types';

export interface DesignTemplate {
  id: string;
  name: string;
  category: 'business' | 'creative' | 'minimal' | 'vibrant';
  preview: string;
  settings: {
    qrColor: string;
    qrColorGradient: GradientColor;
    bgColor: string;
    bgColorGradient: GradientColor;
    dotStyle: string;
    cornerSquareStyle: string;
    cornerDotStyle: string;
    frameOptions: FrameOptions;
    shadow: boolean;
    shadowColor: string;
    shadowBlur: number;
    borderRadius: number;
    margin: number;
  };
}

export const designTemplates: DesignTemplate[] = [
  {
    id: 'classic-black',
    name: 'Classic Black',
    category: 'minimal',
    preview: '🔲',
    settings: {
      qrColor: '#000000',
      qrColorGradient: { type: 'solid', color: '#000000' },
      bgColor: '#ffffff',
      bgColorGradient: { type: 'solid', color: '#ffffff' },
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      frameOptions: { enabled: false, style: 'none', color: '#000000' },
      shadow: false,
      shadowColor: '#000000',
      shadowBlur: 0,
      borderRadius: 0,
      margin: 10,
    },
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'vibrant',
    preview: '🌈',
    settings: {
      qrColor: '#6366f1',
      qrColorGradient: {
        type: 'linear',
        gradient: {
          colorStops: [
            { offset: 0, color: '#6366f1' },
            { offset: 1, color: '#8b5cf6' },
          ],
          rotation: 45,
        },
      },
      bgColor: '#ffffff',
      bgColorGradient: { type: 'solid', color: '#ffffff' },
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: { enabled: false, style: 'none', color: '#6366f1' },
      shadow: true,
      shadowColor: 'rgba(99, 102, 241, 0.3)',
      shadowBlur: 20,
      borderRadius: 16,
      margin: 15,
    },
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    category: 'business',
    preview: '💼',
    settings: {
      qrColor: '#1e293b',
      qrColorGradient: { type: 'solid', color: '#1e293b' },
      bgColor: '#f8fafc',
      bgColorGradient: { type: 'solid', color: '#f8fafc' },
      dotStyle: 'rounded',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      frameOptions: {
        enabled: true,
        style: 'rounded',
        color: '#1e293b',
      },
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      borderRadius: 8,
      margin: 12,
    },
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    category: 'creative',
    preview: '🌊',
    settings: {
      qrColor: '#0ea5e9',
      qrColorGradient: {
        type: 'linear',
        gradient: {
          colorStops: [
            { offset: 0, color: '#0ea5e9' },
            { offset: 1, color: '#06b6d4' },
          ],
          rotation: 135,
        },
      },
      bgColor: '#ffffff',
      bgColorGradient: {
        type: 'linear',
        gradient: {
          colorStops: [
            { offset: 0, color: '#f0f9ff' },
            { offset: 1, color: '#e0f2fe' },
          ],
          rotation: 180,
        },
      },
      dotStyle: 'dots',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: { enabled: false, style: 'none', color: '#0ea5e9' },
      shadow: true,
      shadowColor: 'rgba(14, 165, 233, 0.2)',
      shadowBlur: 15,
      borderRadius: 20,
      margin: 15,
    },
  },
  {
    id: 'sunset-vibes',
    name: 'Sunset Vibes',
    category: 'vibrant',
    preview: '🌅',
    settings: {
      qrColor: '#f59e0b',
      qrColorGradient: {
        type: 'linear',
        gradient: {
          colorStops: [
            { offset: 0, color: '#f59e0b' },
            { offset: 0.5, color: '#ef4444' },
            { offset: 1, color: '#ec4899' },
          ],
          rotation: 90,
        },
      },
      bgColor: '#fef3c7',
      bgColorGradient: { type: 'solid', color: '#fef3c7' },
      dotStyle: 'extra-rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: { enabled: false, style: 'none', color: '#f59e0b' },
      shadow: true,
      shadowColor: 'rgba(245, 158, 11, 0.3)',
      shadowBlur: 25,
      borderRadius: 24,
      margin: 18,
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    category: 'creative',
    preview: '🌲',
    settings: {
      qrColor: '#059669',
      qrColorGradient: {
        type: 'radial',
        gradient: {
          colorStops: [
            { offset: 0, color: '#10b981' },
            { offset: 1, color: '#059669' },
          ],
        },
      },
      bgColor: '#f0fdf4',
      bgColorGradient: { type: 'solid', color: '#f0fdf4' },
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: {
        enabled: true,
        style: 'banner',
        color: '#059669',
        text: 'Scan Me!',
        textColor: '#ffffff',
      },
      shadow: false,
      shadowColor: '#000000',
      shadowBlur: 0,
      borderRadius: 12,
      margin: 15,
    },
  },
  {
    id: 'minimal-dots',
    name: 'Minimal Dots',
    category: 'minimal',
    preview: '⚪',
    settings: {
      qrColor: '#374151',
      qrColorGradient: { type: 'solid', color: '#374151' },
      bgColor: '#ffffff',
      bgColorGradient: { type: 'solid', color: '#ffffff' },
      dotStyle: 'dots',
      cornerSquareStyle: 'dot',
      cornerDotStyle: 'dot',
      frameOptions: { enabled: false, style: 'none', color: '#374151' },
      shadow: false,
      shadowColor: '#000000',
      shadowBlur: 0,
      borderRadius: 0,
      margin: 20,
    },
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'vibrant',
    preview: '✨',
    settings: {
      qrColor: '#a855f7',
      qrColorGradient: {
        type: 'linear',
        gradient: {
          colorStops: [
            { offset: 0, color: '#a855f7' },
            { offset: 1, color: '#ec4899' },
          ],
          rotation: 45,
        },
      },
      bgColor: '#1e1b4b',
      bgColorGradient: { type: 'solid', color: '#1e1b4b' },
      dotStyle: 'extra-rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: { enabled: false, style: 'none', color: '#a855f7' },
      shadow: true,
      shadowColor: 'rgba(168, 85, 247, 0.5)',
      shadowBlur: 30,
      borderRadius: 20,
      margin: 15,
    },
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'business',
    preview: '🏢',
    settings: {
      qrColor: '#1e40af',
      qrColorGradient: { type: 'solid', color: '#1e40af' },
      bgColor: '#eff6ff',
      bgColorGradient: { type: 'solid', color: '#eff6ff' },
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      frameOptions: {
        enabled: true,
        style: 'basic',
        color: '#1e40af',
      },
      shadow: true,
      shadowColor: 'rgba(30, 64, 175, 0.15)',
      shadowBlur: 12,
      borderRadius: 4,
      margin: 10,
    },
  },
  {
    id: 'candy-pop',
    name: 'Candy Pop',
    category: 'creative',
    preview: '🍭',
    settings: {
      qrColor: '#ec4899',
      qrColorGradient: {
        type: 'radial',
        gradient: {
          colorStops: [
            { offset: 0, color: '#ec4899' },
            { offset: 1, color: '#8b5cf6' },
          ],
        },
      },
      bgColor: '#fce7f3',
      bgColorGradient: { type: 'solid', color: '#fce7f3' },
      dotStyle: 'dots',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
      frameOptions: {
        enabled: true,
        style: 'rounded',
        color: '#ec4899',
      },
      shadow: true,
      shadowColor: 'rgba(236, 72, 153, 0.25)',
      shadowBlur: 18,
      borderRadius: 16,
      margin: 12,
    },
  },
];

export const getTemplatesByCategory = (category: string) => {
  return designTemplates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return designTemplates.find(t => t.id === id);
};
