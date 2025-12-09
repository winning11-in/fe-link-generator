import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Row, Col, Spin, message } from 'antd';
import { Zap, Users, QrCode as QrCodeIcon, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI, scansAPI } from '../services/api';
import Header from '../components/dashboard/Header';
import StatCard from '../components/analytics/StatCard';

const { Content } = Layout;
const { Title, Text } = Typography;

const Analytics = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalScans: 0,
    uniqueVisitors: 0,
    qrCodes: 0,
    engagementRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [qrCodesRes, scansRes] = await Promise.all([
        qrCodeAPI.getAll(),
        scansAPI.getAll(),
      ]);

      const qrCodes = qrCodesRes.qrCodes || [];
      const scans = scansRes.scans || [];

      // Calculate unique visitors based on unique IPs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uniqueIPs = new Set(scans.map((scan: any) => scan.ip));
      const uniqueVisitors = uniqueIPs.size;

      // Calculate total scans
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalScans = qrCodes.reduce((sum: number, qr: any) => sum + (qr.scanCount || 0), 0);

      // Calculate engagement rate (scans per QR code)
      const engagementRate = qrCodes.length > 0
        ? ((totalScans / qrCodes.length / 100) * 100).toFixed(1)
        : '0';

      setStats({
        totalScans,
        uniqueVisitors,
        qrCodes: qrCodes.length,
        engagementRate: parseFloat(engagementRate),
      });
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

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header
        userName={user?.name || 'User'}
        onCreateClick={() => navigate('/dashboard')}
        onLogout={handleLogout}
      />

      <Content style={{ padding: '32px 50px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Analytics
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Track your QR code performance and visitor engagement
            </Text>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Total Scans"
                  value={stats.totalScans.toLocaleString()}
                  change="+12.5%"
                  icon={Zap}
                  iconColor="#6366f1"
                  iconBg="#eff6ff"
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Unique Visitors"
                  value={stats.uniqueVisitors.toLocaleString()}
                  change="+8.2%"
                  icon={Users}
                  iconColor="#3b82f6"
                  iconBg="#dbeafe"
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="QR Codes"
                  value={stats.qrCodes}
                  change="+3"
                  icon={QrCodeIcon}
                  iconColor="#8b5cf6"
                  iconBg="#f3e8ff"
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <StatCard
                  title="Engagement Rate"
                  value={`${stats.engagementRate}%`}
                  change="+5.1%"
                  icon={TrendingUp}
                  iconColor="#10b981"
                  iconBg="#d1fae5"
                />
              </Col>
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Analytics;
