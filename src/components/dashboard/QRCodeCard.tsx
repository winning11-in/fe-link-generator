import { Card, Button, Space, Typography, Tag } from 'antd';
import { Copy, BarChart3, Trash2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { QRCode } from '../../types';

const { Text, Title } = Typography;

interface QRCodeCardProps {
  qr: QRCode;
  onCopy: (data: string) => void;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
}

const QRCodeCard = ({ qr, onCopy, onAnalytics, onDelete }: QRCodeCardProps) => {
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
            icon={<Copy size={16} />}
            onClick={() => onCopy(qr.data)}
          >
            Copy
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
