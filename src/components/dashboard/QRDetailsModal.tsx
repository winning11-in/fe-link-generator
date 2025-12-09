import { Modal, Typography, Space, Tag, Button, Divider } from 'antd';
import { Download, ExternalLink, Calendar, Activity } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { QRCode } from '../../types';

const { Text, Title } = Typography;

interface QRDetailsModalProps {
  open: boolean;
  qr: QRCode | null;
  onClose: () => void;
}

const QRDetailsModal = ({ open, qr, onClose }: QRDetailsModalProps) => {
  if (!qr) return null;

  const scanUrl = `${window.location.origin}/scan/${qr._id}`;

  const downloadQRCode = (format: 'png' | 'svg') => {
    const svg = document.getElementById('qr-code-download') as unknown as SVGElement;
    if (!svg) return;

    if (format === 'svg') {
      // Download as SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${qr.title.replace(/\s+/g, '-')}-qr.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } else {
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
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      styles={{
        body: { padding: 32 },
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* QR Code Display */}
        <div
          style={{
            display: 'inline-block',
            padding: 24,
            background: '#f9fafb',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            marginBottom: 24,
          }}
        >
          <QRCodeSVG
            id="qr-code-download"
            value={scanUrl}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Download Buttons */}
        <Space size="middle" style={{ marginBottom: 32 }}>
          <Button
            type="primary"
            icon={<Download size={16} />}
            onClick={() => downloadQRCode('png')}
            style={{
              background: '#ec4899',
              borderColor: '#ec4899',
            }}
          >
            Download PNG
          </Button>
          <Button
            icon={<Download size={16} />}
            onClick={() => downloadQRCode('svg')}
          >
            Download SVG
          </Button>
        </Space>

        <Divider />

        {/* QR Code Details */}
        <div style={{ textAlign: 'left' }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            {qr.title}
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* Type and Status */}
            <div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Type & Status
              </Text>
              <Space size="small">
                <Tag color="blue" style={{ fontWeight: 600 }}>
                  {qr.type.toUpperCase()}
                </Tag>
                <Tag color={qr.isActive ? 'green' : 'default'} style={{ fontWeight: 600 }}>
                  {qr.isActive ? 'Active' : 'Inactive'}
                </Tag>
              </Space>
            </div>

            {/* Target URL/Data */}
            <div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Target {qr.type === 'url' ? 'URL' : 'Data'}
              </Text>
              <div
                style={{
                  padding: 12,
                  background: '#f9fafb',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  wordBreak: 'break-all',
                  cursor: 'pointer',
                }}
                onClick={() => copyToClipboard(qr.data)}
              >
                <Text>{qr.data}</Text>
                {qr.type === 'url' && (
                  <ExternalLink
                    size={14}
                    style={{ marginLeft: 8, verticalAlign: 'middle' }}
                  />
                )}
              </div>
            </div>

            {/* Scan URL */}
            <div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Scan URL (Tracking Link)
              </Text>
              <div
                style={{
                  padding: 12,
                  background: '#f9fafb',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  wordBreak: 'break-all',
                  cursor: 'pointer',
                }}
                onClick={() => copyToClipboard(scanUrl)}
              >
                <Text>{scanUrl}</Text>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Statistics
              </Text>
              <Space size="large">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Activity size={18} color="#10b981" />
                  <div>
                    <Text style={{ fontSize: 24, fontWeight: 600, display: 'block', lineHeight: 1.2 }}>
                      {qr.scanCount || 0}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Total Scans
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Calendar size={18} color="#3b82f6" />
                  <div>
                    <Text style={{ fontSize: 12, display: 'block', lineHeight: 1.2 }}>
                      {new Date(qr.createdAt).toLocaleDateString()}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Created
                    </Text>
                  </div>
                </div>
              </Space>
            </div>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default QRDetailsModal;
