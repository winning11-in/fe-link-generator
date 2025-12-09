import { Card, Typography } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const { Title, Text } = Typography;

interface UniqueVisitorsChartProps {
  data: Array<{ name: string; visitors: number }>;
}

const UniqueVisitorsChart = ({ data }: UniqueVisitorsChartProps) => {
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
          Unique Visitors
        </Title>
        <Text type="secondary">Daily unique visitor count</Text>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
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
          <Legend />
          <Bar dataKey="visitors" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default UniqueVisitorsChart;
