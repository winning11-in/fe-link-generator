import { Card, Typography, Space } from 'antd';
import type { LucideIcon } from 'lucide-react';

const { Text, Title } = Typography;

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const StatCard = ({ title, value, change, icon: Icon, iconColor, iconBg }: StatCardProps) => {
  const isPositive = change?.startsWith('+');

  return (
    <Card
      style={{
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        height: '100%',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} color={iconColor} />
          </div>
          {change && (
            <Text
              strong
              style={{
                color: isPositive ? '#16a34a' : '#ef4444',
                fontSize: 14,
              }}
            >
              {change}
            </Text>
          )}
        </div>

        <div>
          <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
            {title}
          </Text>
          <Title level={3} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>
      </Space>
    </Card>
  );
};

export default StatCard;
