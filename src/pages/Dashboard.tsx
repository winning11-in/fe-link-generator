import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Row, Col, Card, Typography, Button, Skeleton } from "antd";
import { Plus } from "lucide-react";
import { qrCodeAPI } from "../services/api";
import type { QRCode } from "../types";
import AppLayout from "../components/layout/AppLayout";
import QRCodeList from "../components/dashboard/QRCodeList";

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
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
      message.error(err.response?.data?.message || "Failed to fetch QR codes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQRCode = async (id: string) => {
    try {
      await qrCodeAPI.delete(id);
      message.success("QR Code deleted successfully!");
      fetchQRCodes();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to delete QR code");
    }
  };

  return (
    <AppLayout>
      <div style={{ margin: "0 auto" }}>
        {/* Header */}
        {qrCodes.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16
          }}>
            <Title level={4} style={{ 
              margin: 0, 
              fontWeight: 600,
              flex: '1 1 auto',
              minWidth: 0
            }}>
              Your QR Codes
            </Title>
            <div style={{ display: 'flex', gap: 8 }}>
            <Button
              type="primary"
              onClick={() => navigate('/create', { state: { skipDraft: true } })}
              style={{
                height: 40,
                paddingLeft: 16,
                paddingRight: 20,
                borderRadius: 8,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
           <Plus size={16} />   Create New
            </Button>
            <Button
              type="default"
              onClick={() => navigate('/create?mode=draft')}
              style={{
                height: 40,
                paddingLeft: 12,
                paddingRight: 12,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
              }}
            >
              Drafts
            </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{ padding: "24px 0" }}>
            <div style={{ marginBottom: 24 }}>
              <Skeleton.Input active size="large" style={{ width: 200, height: 32 }} />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                style={{
                  borderRadius: 12,
                  border: "1px solid #e8e8e8",
                  marginBottom: 12,
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Row gutter={16} align="middle">
                  <Col flex="none">
                    <Skeleton.Avatar shape="square" size={60} />
                  </Col>
                  <Col flex="auto">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Skeleton.Input active size="small" style={{ width: 200, height: 20 }} />
                        <Skeleton.Button active size="small" style={{ width: 50, height: 22 }} />
                      </div>
                      <Skeleton.Input active size="small" style={{ width: 300, height: 16, marginBottom: 12 }} />
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
                        <Skeleton.Button active size="small" style={{ width: 60, height: 22 }} />
                        <Skeleton.Input active size="small" style={{ width: 80, height: 16 }} />
                      </div>
                    </div>
                  </Col>
                  <Col flex="none">
                    <div style={{ display: "flex", gap: 4 }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton.Button key={i} active size="small" style={{ width: 32, height: 32 }} />
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        ) : qrCodes.length === 0 ? (
          /* Empty State */
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate('/create', { state: { skipDraft: true } })}
                style={{
                  borderRadius: 12,
                  border: "2px dashed #667eea",
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                bodyStyle={{ padding: 32, textAlign: "center" }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Plus size={32} color="#fff" />
                </div>
                <Title
                  level={4}
                  style={{ margin: 0, marginBottom: 8, color: "#1a1a1a" }}
                >
                  Start from Scratch
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Create a custom QR code with your own design and content
                </Text>
              </Card>
            </Col>
          </Row>
        ) : (
          /* List View */
          <QRCodeList
            qrCodes={qrCodes}
            onAnalytics={(id) => navigate(`/qr/${id}/analytics`)}
            onDelete={handleDeleteQRCode}
            loading={loading}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
