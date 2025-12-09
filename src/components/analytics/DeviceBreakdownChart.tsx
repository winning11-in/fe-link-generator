import { Card, Typography } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const { Title, Text } = Typography;

interface DeviceData {
  name: string;
  value: number;
  percentage: number;
  [key: string]: string | number;
}

interface DeviceBreakdownChartProps {
  data: DeviceData[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6'];

const DeviceBreakdownChart = ({ data }: DeviceBreakdownChartProps) => {
  return (
    <Card
      style={{
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        height: '100%',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4, marginTop: 0 }}>
          Device Breakdown
        </Title>
        <Text type="secondary">Visitor distribution by device</Text>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ marginTop: 24 }}>
        {data.map((device, index) => (
          <div
            key={device.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: COLORS[index % COLORS.length],
                }}
              />
              <Text>{device.name}</Text>
            </div>
            <Text strong style={{ color: '#6366f1' }}>
              {device.percentage}%
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DeviceBreakdownChart;
