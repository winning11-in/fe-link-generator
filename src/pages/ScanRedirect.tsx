/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography, Result } from 'antd';
import { qrCodeAPI } from '../services/api';

const { Title, Text } = Typography;

const ScanRedirect = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScan = async () => {
      try {
        if (!id) {
          setError('Invalid QR code');
          setLoading(false);
          return;
        }

        // Track the scan
        await qrCodeAPI.trackScan(id);

        // Get QR code details
        const response = await qrCodeAPI.getOne(id);
        const qrCode = response.qrCode;

        if (!qrCode || !qrCode.data) {
          setError('QR code not found');
          setLoading(false);
          return;
        }

        // Redirect to the actual URL
        window.location.href = qrCode.data;
      } catch (err: any) {
        console.error('Error tracking scan:', err);
        setError(err.response?.data?.message || 'Failed to process QR code');
        setLoading(false);
      }
    };

    handleScan();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
        }}
      >
        <Spin size="large" />
        <Title level={3} style={{ marginTop: 24 }}>
          Redirecting...
        </Title>
        <Text type="secondary">Please wait while we process your request</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
        }}
      >
        <Result
          status="error"
          title="Error"
          subTitle={error}
          style={{ maxWidth: 600 }}
        />
      </div>
    );
  }

  return null;
};

export default ScanRedirect;
