import { Button, Typography } from 'antd';
import { Plus, QrCode } from 'lucide-react';

const { Title, Text } = Typography;

interface EmptyStateProps {
  onCreateClick: () => void;
}

const EmptyState = ({ onCreateClick }: EmptyStateProps) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '80px 40px',
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <QrCode size={40} color="#9ca3af" />
      </div>
      <Title level={3} style={{ marginBottom: 8 }}>
        No QR Codes Yet
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Create, manage, and track all your QR codes in one place
      </Text>
      <Button
        type="primary"
        size="large"
        icon={<Plus size={20} />}
        onClick={onCreateClick}
        style={{
          background: '#6366f1',
          borderColor: '#6366f1',
          fontWeight: 600,
          height: 48,
          padding: '0 32px',
        }}
      >
        Create QR Code
      </Button>
    </div>
  );
};

export default EmptyState;
