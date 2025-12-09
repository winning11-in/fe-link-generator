/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Space, Spin, message } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI } from '../services/api';
import type { QRCode } from '../types';
import Header from '../components/dashboard/Header';
import QRCodeCard from '../components/dashboard/QRCodeCard';
import EmptyState from '../components/dashboard/EmptyState';

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await qrCodeAPI.getAll();
      setQrCodes(response.qrCodes || []);
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to fetch QR codes');
    } finally {
      setLoading(false);
    }
  };

 
  const handleDeleteQRCode = async (id: string) => {
    try {
      await qrCodeAPI.delete(id);
      message.success('QR Code deleted successfully!');
      fetchQRCodes();
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to delete QR code');
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
        onCreateClick={() => navigate('/create')}
        onLogout={handleLogout}
      />

      <Content style={{ padding: '32px 50px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Your QR Codes
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Create, manage, and track all your QR codes in one place
            </Text>
          </div>

          {/* QR Codes List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Spin size="large" />
            </div>
          ) : qrCodes.length === 0 ? (
            <EmptyState onCreateClick={() => navigate('/create')} />
          ) : (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {qrCodes.map((qr) => (
                <QRCodeCard
                  key={qr._id}
                  qr={qr}
                  onAnalytics={(id) => navigate(`/qr/${id}/analytics`)}
                  onDelete={handleDeleteQRCode}
                />
              ))}
            </Space>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
