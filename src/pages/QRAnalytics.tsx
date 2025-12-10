import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, Spin, Table, message, Button } from "antd";
import { ArrowLeft } from 'lucide-react';
import { qrCodeAPI, scansAPI } from "../services/api";
import AppLayout from '../components/layout/AppLayout';

const { Title, Text } = Typography;

const QRAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      message.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Browser",
      dataIndex: "browser",
      key: "browser",
      render: (browser: any) => browser?.name || "Unknown",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      render: (os: any) => os?.name || "Unknown",
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      render: (device: any) => device?.type || "Unknown",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: any) =>
        location?.city && location?.country
          ? `${location.city}, ${location.country}`
          : "Unknown",
    },
  ];

  return (
    <AppLayout>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Button
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/dashboard')}
          style={{ marginBottom: 24 }}
        >
          Back to Dashboard
        </Button>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
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

            {/* Scans Table */}
            <Card
              title="Scan Details"
              style={{
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
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
    </AppLayout>
  );
};

export default QRAnalytics;
