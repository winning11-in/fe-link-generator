import type { CardTemplate } from "../../types/cardTemplates";

export const cardTemplates: CardTemplate[] = [
  {
    id: 'eco-friendly',
    name: 'Eco Friendly',
    category: 'eco',
    preview: '/templates/eco-friendly.png',
    settings: {
      width: 400,
      height: 600,
      backgroundColor: '#4CAF50',
      gradient: {
        type: 'linear',
        colors: ['#4CAF50', '#66BB6A'],
        direction: '135deg'
      },
      padding: 30,
      borderRadius: 20,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.15)',
      shadowBlur: 20,
      shadowOffset: { x: 0, y: 10 }
    },
    elements: [
      {
        id: 'upload-icon',
        type: 'icon',
        position: { x: 180, y: 50 },
        size: { width: 40, height: 40 },
        zIndex: 2,
        src: 'upload',
        color: 'rgba(255,255,255,0.8)'
      },
      {
        id: 'main-title',
        type: 'text',
        position: { x: 50, y: 120 },
        size: { width: 300, height: 60 },
        zIndex: 2,
        text: 'Eco Friendly',
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 1.2
      },
      {
        id: 'subtitle',
        type: 'text',
        position: { x: 50, y: 180 },
        size: { width: 300, height: 30 },
        zIndex: 2,
        text: 'Scan for sustainability info',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center'
      },
      {
        id: 'qr-background',
        type: 'shape',
        position: { x: 50, y: 240 },
        size: { width: 300, height: 300 },
        zIndex: 1,
        shapeType: 'rectangle',
        fill: '#FFFFFF',
        stroke: 'none',
        cornerRadius: 15
      },
      {
        id: 'qrcode',
        type: 'qrcode',
        position: { x: 75, y: 265 },
        size: { width: 250, height: 250 },
        zIndex: 2,
        qrSettings: {
          errorLevel: 'M',
          margin: 0,
          cornerRadius: 8
        }
      }
    ]
  },
  {
    id: 'modern-business',
    name: 'Modern Business',
    category: 'business',
    preview: '/templates/modern-business.png',
    settings: {
      width: 400,
      height: 600,
      backgroundColor: '#1E3A8A',
      gradient: {
        type: 'linear',
        colors: ['#1E3A8A', '#3B82F6'],
        direction: '45deg'
      },
      padding: 25,
      borderRadius: 15,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowBlur: 25,
      shadowOffset: { x: 0, y: 12 }
    },
    elements: [
      {
        id: 'company-logo',
        type: 'shape',
        position: { x: 50, y: 40 },
        size: { width: 60, height: 60 },
        zIndex: 2,
        shapeType: 'circle',
        fill: '#FFFFFF',
        stroke: 'none'
      },
      {
        id: 'company-name',
        type: 'text',
        position: { x: 130, y: 45 },
        size: { width: 220, height: 25 },
        zIndex: 2,
        text: 'Your Company',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'left'
      },
      {
        id: 'tagline',
        type: 'text',
        position: { x: 130, y: 70 },
        size: { width: 220, height: 20 },
        zIndex: 2,
        text: 'Innovation at its finest',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'left'
      },
      {
        id: 'main-heading',
        type: 'text',
        position: { x: 50, y: 140 },
        size: { width: 300, height: 50 },
        zIndex: 2,
        text: 'Connect With Us',
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center'
      },
      {
        id: 'description',
        type: 'text',
        position: { x: 50, y: 200 },
        size: { width: 300, height: 40 },
        zIndex: 2,
        text: 'Scan to access our digital business card',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center'
      },
      {
        id: 'qr-container',
        type: 'shape',
        position: { x: 75, y: 270 },
        size: { width: 250, height: 250 },
        zIndex: 1,
        shapeType: 'rectangle',
        fill: '#FFFFFF',
        stroke: 'none',
        cornerRadius: 12
      },
      {
        id: 'qrcode',
        type: 'qrcode',
        position: { x: 95, y: 290 },
        size: { width: 210, height: 210 },
        zIndex: 2,
        qrSettings: {
          errorLevel: 'M',
          margin: 0,
          cornerRadius: 6
        }
      },
      {
        id: 'website',
        type: 'text',
        position: { x: 50, y: 540 },
        size: { width: 300, height: 20 },
        zIndex: 2,
        text: 'www.yourcompany.com',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center'
      }
    ]
  },
  {
    id: 'minimalist-tech',
    name: 'Minimalist Tech',
    category: 'tech',
    preview: '/templates/minimalist-tech.png',
    settings: {
      width: 400,
      height: 600,
      backgroundColor: '#000000',
      padding: 40,
      borderRadius: 0,
      shadow: false,
      shadowColor: '',
      shadowBlur: 0,
      shadowOffset: { x: 0, y: 0 }
    },
    elements: [
      {
        id: 'tech-icon',
        type: 'shape',
        position: { x: 175, y: 60 },
        size: { width: 50, height: 50 },
        zIndex: 2,
        shapeType: 'rectangle',
        fill: '#00FF88',
        stroke: 'none',
        cornerRadius: 8
      },
      {
        id: 'brand-name',
        type: 'text',
        position: { x: 50, y: 140 },
        size: { width: 300, height: 40 },
        zIndex: 2,
        text: 'TECHFLOW',
        fontFamily: 'JetBrains Mono',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 4
      },
      {
        id: 'divider',
        type: 'shape',
        position: { x: 100, y: 190 },
        size: { width: 200, height: 2 },
        zIndex: 2,
        shapeType: 'rectangle',
        fill: '#00FF88',
        stroke: 'none'
      },
      {
        id: 'scan-text',
        type: 'text',
        position: { x: 50, y: 220 },
        size: { width: 300, height: 25 },
        zIndex: 2,
        text: '> SCAN TO ACCESS',
        fontFamily: 'JetBrains Mono',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#00FF88',
        textAlign: 'center'
      },
      {
        id: 'qrcode',
        type: 'qrcode',
        position: { x: 100, y: 270 },
        size: { width: 200, height: 200 },
        zIndex: 2,
        qrSettings: {
          errorLevel: 'H',
          margin: 10,
          cornerRadius: 0
        }
      },
      {
        id: 'footer-text',
        type: 'text',
        position: { x: 50, y: 500 },
        size: { width: 300, height: 25 },
        zIndex: 2,
        text: 'NEXT-GEN SOLUTIONS',
        fontFamily: 'JetBrains Mono',
        fontSize: 12,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        letterSpacing: 2
      }
    ]
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    category: 'creative',
    preview: '/templates/creative-gradient.png',
    settings: {
      width: 400,
      height: 600,
      backgroundColor: '#FF6B6B',
      gradient: {
        type: 'linear',
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
        direction: '45deg'
      },
      padding: 35,
      borderRadius: 25,
      shadow: true,
      shadowColor: 'rgba(255,107,107,0.4)',
      shadowBlur: 30,
      shadowOffset: { x: 0, y: 15 }
    },
    elements: [
      {
        id: 'creative-shape-1',
        type: 'shape',
        position: { x: 300, y: 50 },
        size: { width: 80, height: 80 },
        zIndex: 1,
        shapeType: 'circle',
        fill: 'rgba(255,255,255,0.1)',
        stroke: 'none'
      },
      {
        id: 'creative-shape-2',
        type: 'shape',
        position: { x: 20, y: 120 },
        size: { width: 60, height: 60 },
        zIndex: 1,
        shapeType: 'circle',
        fill: 'rgba(255,255,255,0.08)',
        stroke: 'none'
      },
      {
        id: 'main-title',
        type: 'text',
        position: { x: 50, y: 100 },
        size: { width: 300, height: 50 },
        zIndex: 2,
        text: 'Get Creative',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center'
      },
      {
        id: 'subtitle',
        type: 'text',
        position: { x: 50, y: 160 },
        size: { width: 300, height: 30 },
        zIndex: 2,
        text: 'Unleash your imagination',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center'
      },
      {
        id: 'qr-glow',
        type: 'shape',
        position: { x: 85, y: 255 },
        size: { width: 230, height: 230 },
        zIndex: 1,
        shapeType: 'rectangle',
        fill: 'rgba(255,255,255,0.95)',
        stroke: 'none',
        cornerRadius: 20
      },
      {
        id: 'qrcode',
        type: 'qrcode',
        position: { x: 100, y: 270 },
        size: { width: 200, height: 200 },
        zIndex: 2,
        qrSettings: {
          errorLevel: 'M',
          margin: 0,
          cornerRadius: 12
        }
      },
      {
        id: 'call-to-action',
        type: 'text',
        position: { x: 50, y: 520 },
        size: { width: 300, height: 25 },
        zIndex: 2,
        text: 'Scan • Connect • Create',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        letterSpacing: 1
      }
    ]
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimal',
    category: 'minimal',
    preview: '/templates/clean-minimal.png',
    settings: {
      width: 400,
      height: 600,
      backgroundColor: '#FFFFFF',
      padding: 50,
      borderRadius: 8,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.08)',
      shadowBlur: 20,
      shadowOffset: { x: 0, y: 4 }
    },
    elements: [
      {
        id: 'brand-mark',
        type: 'shape',
        position: { x: 150, y: 60 },
        size: { width: 100, height: 4 },
        zIndex: 2,
        shapeType: 'rectangle',
        fill: '#000000',
        stroke: 'none'
      },
      {
        id: 'main-heading',
        type: 'text',
        position: { x: 50, y: 120 },
        size: { width: 300, height: 50 },
        zIndex: 2,
        text: 'Scan Me',
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: '300',
        color: '#000000',
        textAlign: 'center',
        letterSpacing: -1
      },
      {
        id: 'description',
        type: 'text',
        position: { x: 50, y: 180 },
        size: { width: 300, height: 40 },
        zIndex: 2,
        text: 'Simple. Clean. Effective.',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#666666',
        textAlign: 'center'
      },
      {
        id: 'qr-border',
        type: 'shape',
        position: { x: 98, y: 248 },
        size: { width: 204, height: 204 },
        zIndex: 1,
        shapeType: 'rectangle',
        fill: 'none',
        stroke: '#E5E5E5',
        strokeWidth: 1
      },
      {
        id: 'qrcode',
        type: 'qrcode',
        position: { x: 100, y: 250 },
        size: { width: 200, height: 200 },
        zIndex: 2,
        qrSettings: {
          errorLevel: 'M',
          margin: 10,
          cornerRadius: 0
        }
      },
      {
        id: 'footer-line',
        type: 'shape',
        position: { x: 150, y: 500 },
        size: { width: 100, height: 1 },
        zIndex: 2,
        shapeType: 'rectangle',
        fill: '#CCCCCC',
        stroke: 'none'
      },
      {
        id: 'contact-info',
        type: 'text',
        position: { x: 50, y: 520 },
        size: { width: 300, height: 20 },
        zIndex: 2,
        text: 'hello@example.com',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'normal',
        color: '#999999',
        textAlign: 'center'
      }
    ]
  }
];

export const getTemplateById = (id: string): CardTemplate | undefined => {
  return cardTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: CardTemplate['category']): CardTemplate[] => {
  return cardTemplates.filter(template => template.category === category);
};