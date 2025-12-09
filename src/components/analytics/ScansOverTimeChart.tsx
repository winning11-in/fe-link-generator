import { Card, Typography } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const { Title, Text } = Typography;

interface ScansOverTimeChartProps {
  data: Array<{ name: string; scans: number }>;
}

const ScansOverTimeChart = ({ data }: ScansOverTimeChartProps) => {
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
          Scans Over Time
        </Title>
        <Text type="secondary">Last 7 days performance</Text>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            style={{ fontSize: 12 }}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
            }}
          />
          <Area
            type="monotone"
            dataKey="scans"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScans)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ScansOverTimeChart;
