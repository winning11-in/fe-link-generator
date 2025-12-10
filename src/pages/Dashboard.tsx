import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  message, Row, Col, Card, Typography, Skeleton } from "antd";
import { Plus, FileText, Sparkles } from "lucide-react";
import { qrCodeAPI } from "../services/api";
import type { QRCode } from "../types";
import AppLayout from "../components/layout/AppLayout";
import QRCodeCard from "../components/dashboard/QRCodeCard";
import EmptyState from "../components/dashboard/EmptyState";

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
        {/* Quick Start Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} md={8}>
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
              }}
              bodyStyle={{ padding: 32, textAlign: "center" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#764ba2";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(102, 126, 234, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
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

          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => navigate("/create?mode=template")}
              style={{
                borderRadius: 12,
                border: "2px dashed #52c41a",
                background:
                  "linear-gradient(135deg, rgba(82, 196, 26, 0.05) 0%, rgba(115, 209, 61, 0.05) 100%)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              bodyStyle={{ padding: 32, textAlign: "center" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#73d13d";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(82, 196, 26, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#52c41a";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background:
                    "linear-gradient(135deg, #52c41a 0%, #73d13d 100%)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <FileText size={32} color="#fff" />
              </div>
              <Title
                level={4}
                style={{ margin: 0, marginBottom: 8, color: "#1a1a1a" }}
              >
                Start with Template
              </Title>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Choose from pre-designed templates for quick creation
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => navigate("/create?mode=ai")}
              style={{
                borderRadius: 12,
                border: "2px dashed #fa8c16",
                background:
                  "linear-gradient(135deg, rgba(250, 140, 22, 0.05) 0%, rgba(250, 173, 20, 0.05) 100%)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              bodyStyle={{ padding: 32, textAlign: "center" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#faad14";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(250, 140, 22, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#fa8c16";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background:
                    "linear-gradient(135deg, #fa8c16 0%, #faad14 100%)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Sparkles size={32} color="#fff" />
              </div>
              <Title
                level={4}
                style={{ margin: 0, marginBottom: 8, color: "#1a1a1a" }}
              >
                AI-Powered Design
              </Title>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Let AI create a unique QR code design for you
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Section Title */}
        {qrCodes.length > 0 && (
          <Title level={4} style={{ marginBottom: 16, fontWeight: 600 }}>
            Your QR Codes
          </Title>
        )}

        {/* QR Codes List */}
        {loading ? (
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <Card
                  style={{
                    borderRadius: 12,
                    height: "100%",
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                  </div>
                  <Skeleton active title paragraph={{ rows: 2 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : qrCodes.length === 0 ? (
          <EmptyState onCreateClick={() => navigate("/create")} />
        ) : (
          <Row gutter={[16, 16]}>
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
