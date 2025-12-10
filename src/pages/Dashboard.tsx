import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, message, Row, Col, Card, Typography } from "antd";
import { Plus } from "lucide-react";
import { qrCodeAPI } from "../services/api";
import type { QRCode } from "../types";
import AppLayout from "../components/layout/AppLayout";
import QRCodeCard from "../components/dashboard/QRCodeCard";

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
        {/* Section Title */}
        {qrCodes.length > 0 && (
          <Title level={4} style={{ marginBottom: 16, fontWeight: 600 }}>
            Your QR Codes
          </Title>
        )}

        {/* QR Codes List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Spin size="large" />
          </div>
        ) : qrCodes.length === 0 ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate("/create")}
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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate("/create")}
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
            {qrCodes.map((qr) => (
              <Col key={qr._id} xs={24} sm={12} md={8} lg={6}>
                <QRCodeCard
                  qr={qr}
                  onAnalytics={(id) => navigate(`/qr/${id}/analytics`)}
                  onDelete={handleDeleteQRCode}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
