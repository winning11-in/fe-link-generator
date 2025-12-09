import { Card, Button, Space, Typography, Tag, message } from 'antd';
import { BarChart3, Trash2, Download, Share2 } from 'lucide-react';
import { useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRCode } from '../../types';

const { Text, Title } = Typography;

interface QRCodeCardProps {
  qr: QRCode;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
}

const QRCodeCard = ({ qr, onAnalytics, onDelete }: QRCodeCardProps) => {
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scanUrl = `${window.location.origin}/scan/${qr._id}`;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const customization = qr.customization;

    const errorCorrectionMap: Record<string, 'L' | 'M' | 'Q' | 'H'> = {
      'L': 'L',
      'M': 'M',
      'Q': 'Q',
      'H': 'H'
    };

    const qrCodeConfig: any = {
      width: 120,
      height: 120,
      data: scanUrl,
      dotsOptions: {
        color: customization?.qrColor || '#000000',
        type: (customization?.dotStyle || 'square'),
      },
      backgroundOptions: {
        color: customization?.bgColor || '#ffffff',
      },
      cornersSquareOptions: {
        color: customization?.qrColor || '#000000',
        type: (customization?.cornerSquareStyle || 'square'),
      },
      cornersDotOptions: {
        color: customization?.qrColor || '#000000',
        type: (customization?.cornerDotStyle || 'square'),
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrectionMap[customization?.errorLevel || 'M'],
      },
    };

    // Only add image options if logo exists
    if (customization?.logo) {
      qrCodeConfig.imageOptions = {
        hideBackgroundDots: customization.removeBackground ?? true,
        imageSize: (customization.logoSize || 50) / 280,
        margin: customization.logoPadding || 5,
      };
      qrCodeConfig.image = customization.logo;
    }

    try {
      const qrCode = new QRCodeStyling(qrCodeConfig);
      
      container.innerHTML = '';
      qrCode.append(container);
      qrCodeRef.current = qrCode;
    } catch (error) {
      console.error('Error rendering QR code:', error);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [qr, scanUrl]);

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
    
    qrCodeRef.current.download({
      name: qr.title.replace(/\s+/g, '-') + '-qr',
      extension: 'png',
    });
    message.success('QR Code downloaded!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: qr.title,
          text: `Check out this QR code: ${qr.title}`,
          url: scanUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(scanUrl);
      message.success('Link copied to clipboard!');
    }
  };
  return (
    <Card
      style={{
        borderRadius: 12,
        border: '1px solid #e5e7eb',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* QR Code Preview */}
        <div
          style={{
            padding: 8,
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
          }}
        >
          <div ref={containerRef} style={{ width: 120, height: 120 }} />
        </div>

        {/* QR Code Info */}
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            {qr.title}
          </Title>
          <Text
            type="secondary"
            style={{
              display: 'block',
              marginBottom: 16,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {qr.data}
          </Text>
          <Space size="small" wrap>
            <Tag color="blue" style={{ fontWeight: 600 }}>
              {qr.type.toUpperCase()}
            </Tag>
            <Tag color="green" style={{ fontWeight: 600 }}>
              {qr.scanCount || 0} scans
            </Tag>
            <Tag color={qr.isActive ? 'green' : 'default'} style={{ fontWeight: 600 }}>
              {qr.isActive ? 'Active' : 'Inactive'}
            </Tag>
          </Space>
        </div>
        {/* Actions */}
        <Space>
          <Button
            icon={<Download size={16} />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            icon={<Share2 size={16} />}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            icon={<BarChart3 size={16} />}
            onClick={() => onAnalytics(qr._id)}
          >
            Analytics
          </Button>
          <Button
            danger
            icon={<Trash2 size={16} />}
            onClick={() => onDelete(qr._id)}
          >
            Delete
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default QRCodeCard;
