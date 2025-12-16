import React from 'react';
import type { CardTemplate } from '../../types/cardTemplates';

interface TemplatePreviewMiniProps {
  template: CardTemplate;
  scale?: number; // 0-1 scale
}

const TemplatePreviewMini: React.FC<TemplatePreviewMiniProps> = ({ template, scale = 0.45 }) => {
  const scaledStyle = (val: number) => Math.round(val * scale);

  const renderElement = (element: any) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: scaledStyle(element.position.x),
      top: scaledStyle(element.position.y),
      width: scaledStyle(element.size.width),
      height: scaledStyle(element.size.height),
      zIndex: element.zIndex,
      transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
      opacity: element.opacity ?? 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start'
    };

    if (element.type === 'text') {
      return (
        <div key={element.id} style={{ ...style, fontFamily: element.fontFamily, fontSize: scaledStyle(element.fontSize || 12), fontWeight: element.fontWeight, color: element.color, lineHeight: element.lineHeight }}>
          {element.text}
        </div>
      );
    }

    if (element.type === 'qrcode') {
      return (
        <div key={element.id} style={{ ...style, backgroundColor: 'white', borderRadius: element.qrSettings?.cornerRadius || 0, padding: scaledStyle(element.qrSettings?.margin || 0) }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
        </div>
      );
    }

    if (element.type === 'shape' || element.type === 'icon') {
      // support gradient/pattern strings in element.fill
      const fill = element.fill as string | undefined;
      const useBgImage = typeof fill === 'string' && (/gradient|radial|repeating|url\(/i).test(fill);

      return (
        <div
          key={element.id}
          style={{
            ...style,
            backgroundColor: useBgImage ? undefined : fill,
            backgroundImage: useBgImage ? fill : undefined,
            backgroundRepeat: useBgImage ? 'no-repeat' : undefined,
            border: element.stroke ? `${element.strokeWidth || 1}px solid ${element.stroke}` : 'none',
            borderRadius: element.shapeType === 'circle' ? '50%' : element.cornerRadius ? `${element.cornerRadius}px` : undefined
          }}
        />
      );
    }

    return null;
  };

  const cardStyle: React.CSSProperties = {
    width: scaledStyle(template.settings.width),
    height: scaledStyle(template.settings.height),
    backgroundColor: template.settings.backgroundColor,
    backgroundImage: template.settings.gradient ? `linear-gradient(${template.settings.gradient.direction}, ${template.settings.gradient.colors.join(', ')})` : undefined,
    borderRadius: template.settings.borderRadius,
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={cardStyle}>
        {template.elements.map((el) => renderElement(el))}
      </div>
    </div>
  );
};

export default TemplatePreviewMini;
