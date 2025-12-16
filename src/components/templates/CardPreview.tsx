import React, { useEffect, useRef } from 'react';
import { Card, Typography, Space, Button, Select } from 'antd';
import { Download } from 'lucide-react';
import type { CardTemplate } from '../../types/cardTemplates';
import QRCodeStyling from 'qr-code-styling';
import { toPng, toSvg, toJpeg } from 'html-to-image';

const {  Text } = Typography;
const { Option } = Select;

interface CardPreviewProps {
  qrData: string;
  cardTemplate: CardTemplate | null;
  qrCustomization: any;
  downloadFormat: 'png' | 'svg' | 'jpeg';
  onDownloadFormatChange: (format: 'png' | 'svg' | 'jpeg') => void;
  onEditCard?: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  qrData,
  cardTemplate,
  qrCustomization,
  downloadFormat,
  onDownloadFormatChange,
  onEditCard
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (qrData && cardTemplate && cardRef.current) {
      const qrElement = cardTemplate.elements.find(el => el.type === 'qrcode');
      if (qrElement) {
        qrCodeRef.current = new QRCodeStyling({
          width: qrElement.size.width,
          height: qrElement.size.height,
          data: qrData,
          dotsOptions: {
            color: qrCustomization.qrColor || '#000000',
            type: qrCustomization.dotStyle || 'square'
          },
          backgroundOptions: {
            color: 'transparent'
          },
          cornersSquareOptions: {
            color: qrCustomization.qrColor || '#000000',
            type: qrCustomization.cornerSquareStyle || 'square'
          },
          cornersDotOptions: {
            color: qrCustomization.qrColor || '#000000',
            type: qrCustomization.cornerDotStyle || 'square'
          },
          imageOptions: qrCustomization.logo ? {
            hideBackgroundDots: true,
            imageSize: qrCustomization.logoSize / 100,
            margin: qrCustomization.logoPadding
          } : undefined,
          image: qrCustomization.logo || undefined
        });

        const qrContainer = cardRef.current.querySelector(`[data-element-id="${qrElement.id}"]`);
        if (qrContainer) {
          qrContainer.innerHTML = '';
          qrCodeRef.current.append(qrContainer as HTMLElement);
        }
      }
    }
  }, [qrData, cardTemplate, qrCustomization]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      let dataUrl: string;
      
      switch (downloadFormat) {
        case 'png':
          dataUrl = await toPng(cardRef.current, { 
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: cardTemplate?.settings.backgroundColor || '#ffffff'
          });
          break;
        case 'svg':
          dataUrl = await toSvg(cardRef.current, { 
            backgroundColor: cardTemplate?.settings.backgroundColor || '#ffffff'
          });
          break;
        case 'jpeg':
          dataUrl = await toJpeg(cardRef.current, { 
            quality: 1.0,
            backgroundColor: cardTemplate?.settings.backgroundColor || '#ffffff'
          });
          break;
        default:
          return;
      }

      const link = document.createElement('a');
      link.download = `qr-card.${downloadFormat}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const renderElement = (element: any) => {
    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      zIndex: element.zIndex,
      transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
      opacity: element.opacity || 1
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            data-element-id={element.id}
            style={{
              ...elementStyle,
              fontFamily: element.fontFamily,
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              color: element.color,
              textAlign: element.textAlign,
              lineHeight: element.lineHeight,
              letterSpacing: element.letterSpacing,
              display: 'flex',
              alignItems: 'center',
              justifyContent: element.textAlign === 'center' ? 'center' : 
                           element.textAlign === 'right' ? 'flex-end' : 'flex-start'
            }}
          >
            {element.text}
          </div>
        );

      case 'qrcode':
        return (
          <div
            key={element.id}
            data-element-id={element.id}
            style={{
              ...elementStyle,
              backgroundColor: 'white',
              borderRadius: element.qrSettings?.cornerRadius || 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: element.qrSettings?.margin || 0
            }}
          />
        );

      case 'shape':
        // support gradient/pattern fills (strings that include 'gradient' or 'url(' etc.)
        const fillVal = element.fill as string | undefined;
        const useBgImage = typeof fillVal === 'string' && (/gradient|radial|repeating|url\(/i).test(fillVal);

        return (
          <div
            key={element.id}
            data-element-id={element.id}
            style={{
              ...elementStyle,
              backgroundColor: useBgImage ? undefined : fillVal,
              backgroundImage: useBgImage ? fillVal : undefined,
              backgroundRepeat: useBgImage ? 'no-repeat' : undefined,
              backgroundSize: useBgImage ? 'cover' : undefined,
              border: element.stroke ? `${element.strokeWidth || 1}px solid ${element.stroke}` : 'none',
              borderRadius: element.shapeType === 'circle' ? '50%' : 
                           element.cornerRadius ? `${element.cornerRadius}px` : '0'
            }}
          />
        );

      case 'icon':
        return (
          <div
            key={element.id}
            data-element-id={element.id}
            style={{
              ...elementStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: element.color || '#000000'
            }}
          >
            <div
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: 'currentColor',
                opacity: 0.8,
                borderRadius: '4px'
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!cardTemplate) {
    return (
      <Card title="QR Preview">
        <div style={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 8
        }}>
          <Text type="secondary">Select a card template to see preview</Text>
        </div>
      </Card>
    );
  }

  const cardStyle: React.CSSProperties = {
    width: cardTemplate.settings.width / 2, // Scale down for preview
    height: cardTemplate.settings.height / 2,
    backgroundColor: cardTemplate.settings.backgroundColor,
    backgroundImage: cardTemplate.settings.gradient 
      ? `linear-gradient(${cardTemplate.settings.gradient.direction}, ${cardTemplate.settings.gradient.colors.join(', ')})`
      : undefined,
    padding: cardTemplate.settings.padding / 2,
    borderRadius: cardTemplate.settings.borderRadius,
    boxShadow: cardTemplate.settings.shadow 
      ? `${cardTemplate.settings.shadowOffset.x}px ${cardTemplate.settings.shadowOffset.y}px ${cardTemplate.settings.shadowBlur}px ${cardTemplate.settings.shadowColor}`
      : 'none',
    position: 'relative',
    overflow: 'hidden',
    margin: '20px auto',
    transform: 'scale(0.5)',
    transformOrigin: 'top center'
  };

  return (
    <Card 
      title="Card Preview" 
      extra={
        <Space>
          {onEditCard && (
            <Button size="small" onClick={onEditCard}>
              Edit Card
            </Button>
          )}
        </Space>
      }
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Text strong>{cardTemplate.name}</Text>
      </div>
      
      <div style={{ 
        height: cardTemplate.settings.height / 4 + 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div
          ref={cardRef}
          style={cardStyle}
        >
          {cardTemplate.elements.map(renderElement)}
        </div>
      </div>

      <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
        <div>
          <Text>Download Format:</Text>
          <Select
            value={downloadFormat}
            onChange={onDownloadFormatChange}
            style={{ width: '100%', marginTop: 4 }}
          >
            <Option value="png">PNG</Option>
            <Option value="svg">SVG</Option>
            <Option value="jpeg">JPEG</Option>
          </Select>
        </div>
        
        <Button 
          type="primary" 
          icon={<Download />} 
          onClick={handleDownload}
          block
        >
          Download Card
        </Button>
      </Space>
    </Card>
  );
};

export default CardPreview;