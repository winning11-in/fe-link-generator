import { Card, Button, Space, Typography, Tag, message } from 'antd';
import { BarChart3, Trash2, Download, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { QRCode } from '../../types';

const { Text, Title } = Typography;

interface QRCodeCardProps {
  qr: QRCode;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
}

const QRCodeCard = ({ qr, onAnalytics, onDelete }: QRCodeCardProps) => {
  const scanUrl = `${window.location.origin}/scan/${qr._id}`;

  const handleDownload = () => {
    const svg = document.getElementById(`qr-code-${qr._id}`) as unknown as SVGElement;
    if (!svg) return;

    // Download as PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx?.drawImage(img, 0, 0, 512, 512);
      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob);
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `${qr.title.replace(/\s+/g, '-')}-qr.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(pngUrl);
        }
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
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
      } catch (err) {
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
            padding: 16,
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
          }}
        >
          <QRCodeSVG
            id={`qr-code-${qr._id}`}
            value={`${window.location.origin}/scan/${qr._id}`}
            size={100}
          />
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
