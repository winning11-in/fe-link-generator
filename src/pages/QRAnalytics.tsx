/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Spin, Table, message } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI, scansAPI } from '../services/api';
import Header from '../components/dashboard/Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const COLORS = ['#6366f1', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

const QRAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [qrCode, setQrCode] = useState<any>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [qrRes, scansRes] = await Promise.all([
        qrCodeAPI.getOne(id!),
        scansAPI.getByQRCodeId(id!),
      ]);

      setQrCode(qrRes.qrCode);
      setScans(scansRes.scans || []);
    } catch {
      message.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Process data for charts
  const browserData = scans.reduce((acc: any, scan: any) => {
    const browser = scan.browser?.name || 'Unknown';
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  const browserChartData = Object.entries(browserData).map(([name, value]) => ({
    name,
    value,
  }));

  const osData = scans.reduce((acc: any, scan: any) => {
    const os = scan.os?.name || 'Unknown';
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {});

  const osChartData = Object.entries(osData).map(([name, value]) => ({
    name,
    value,
  }));

  const deviceData = scans.reduce((acc: any, scan: any) => {
    const device = scan.device?.type || 'Unknown';
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  const deviceChartData = Object.entries(deviceData).map(([name, value]) => ({
    name,
    value,
  }));

  // Table columns
  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      key: 'browser',
      render: (browser: any) => browser?.name || 'Unknown',
    },
    {
      title: 'OS',
      dataIndex: 'os',
      key: 'os',
      render: (os: any) => os?.name || 'Unknown',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      render: (device: any) => device?.type || 'Unknown',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: any) =>
        location?.city && location?.country
          ? `${location.city}, ${location.country}`
          : 'Unknown',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header
        userName={user?.name || 'User'}
        onCreateClick={() => navigate('/dashboard')}
        onLogout={handleLogout}
      />

      <Content style={{ padding: '32px 50px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div style={{ marginBottom: 32 }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  {qrCode?.title}
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  Total Scans: {qrCode?.scanCount || 0}
                </Text>
              </div>

              {/* Charts */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                <Col xs={24} lg={8}>
                  <Card
                    title="Browser Distribution"
                    style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={browserChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => entry.name}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {browserChartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={8}>
                  <Card
                    title="Operating System"
                    style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={osChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={8}>
                  <Card
                    title="Device Type"
                    style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={deviceChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => entry.name}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceChartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>

              {/* Scans Table */}
              <Card
                title="Scan Details"
                style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              >
                <Table
                  columns={columns}
                  dataSource={scans}
                  rowKey="_id"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default QRAnalytics;
