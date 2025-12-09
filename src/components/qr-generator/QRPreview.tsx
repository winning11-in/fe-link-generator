/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import { Card, Button, Space, Typography } from 'antd';
import QRCodeStyling from 'qr-code-styling';

const { Title } = Typography;

interface QRPreviewProps {
  qrData: string;
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
  title: string;
  loading: boolean;
  onSave: () => void;
  onDownload: () => void;
  saveButtonText?: string;
}

const QRPreview = ({
  qrData,
  qrColor,
  bgColor,
  errorLevel,
  dotStyle,
  cornerSquareStyle,
  cornerDotStyle,
  logo,
  logoSize,
  logoPadding,
  removeBackground,
  loading,
  onSave,
  saveButtonText = 'Save QR Code',
}: QRPreviewProps) => {
  const qrCodeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Map error correction level to the correct type
    const errorCorrectionMap = {
      'L': 'L' as const,
      'M': 'M' as const,
      'Q': 'Q' as const,
      'H': 'H' as const
    };

    const qrCode = new QRCodeStyling({
      width: 280,
      height: 280,
      data: qrData || 'https://example.com',
      dotsOptions: {
        color: qrColor,
        type: dotStyle as any,
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        color: qrColor,
        type: cornerSquareStyle as any,
      },
      cornersDotOptions: {
        color: qrColor,
        type: cornerDotStyle as any,
      },
      ...(logo && {
        imageOptions: {
          hideBackgroundDots: removeBackground,
          imageSize: logoSize / 280,
          margin: logoPadding,
        },
        image: logo,
      }),
      qrOptions: {
        errorCorrectionLevel: errorCorrectionMap[errorLevel],
      },
    });

    container.innerHTML = '';
    qrCode.append(container);
    qrCodeRef.current = qrCode;

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [qrData, qrColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle, logo, logoSize, logoPadding, removeBackground, errorLevel]);

  return (
    <Card
      style={{
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        position: 'sticky',
        top: 24,
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        Preview
      </Title>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
          background: '#f9fafb',
          borderRadius: 12,
          marginBottom: 24,
          minHeight: 344,
        }}
      />
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={onSave}
          style={{
            background: '#6366f1',
            borderColor: '#6366f1',
            height: 48,
          }}
        >
          {saveButtonText}
        </Button>
        
      </Space>
    </Card>
  );
};

export default QRPreview;
