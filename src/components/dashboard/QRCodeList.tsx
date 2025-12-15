import { Card, Button, Typography, message, Tooltip, Popconfirm, Tag, Space, Row, Col, Pagination, Skeleton } from "antd";
import { BarChart3, Trash2, Share2, Edit, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QRCode } from "../../types";

const { Text, Title } = Typography;

interface QRCodeListProps {
  qrCodes: QRCode[];
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const QRCodeList = ({ qrCodes, onAnalytics, onDelete, loading = false }: QRCodeListProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleShare = async (qr: QRCode) => {
    const scanUrl = `${window.location.origin}/scan/${qr._id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: qr.name,
          text: `Check out this QR code: ${qr.name}`,
          url: scanUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(scanUrl);
      message.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            style={{
              borderRadius: 12,
              border: "1px solid #e8e8e8",
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Row gutter={16} align="middle">
              <Col flex="none">
                <Skeleton.Avatar shape="square" size={60} active />
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
    );
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedQrCodes = qrCodes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* QR Codes List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {paginatedQrCodes.map((qr) => (
          <QRCodeListItem
            key={qr._id}
            qr={qr}
            onAnalytics={onAnalytics}
            onDelete={onDelete}
            onShare={handleShare}
            navigate={navigate}
          />
        ))}
      </div>

      {/* Pagination */}
      {qrCodes.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Pagination
            current={currentPage}
            total={qrCodes.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper={false}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} QR codes`
            }
            style={{
              background: "#fff",
              padding: "16px 24px",
              borderRadius: 12,
              border: "1px solid #e8e8e8",
            }}
          />
        </div>
      )}
    </div>
  );
};

interface QRCodeListItemProps {
  qr: QRCode;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (qr: QRCode) => void;
  navigate: (path: string) => void;
}

const QRCodeListItem = ({ qr, onAnalytics, onDelete, onShare, navigate }: QRCodeListItemProps) => {
  const scanUrl = `${window.location.origin}/scan/${qr._id}`;

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        border: "1px solid #e8e8e8",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "#ffffff",
        marginBottom: 0,
      }}
      bodyStyle={{ padding: 16 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.borderColor = "#667eea";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e8e8e8";
      }}
    >
      <Row gutter={16} align="middle">
        {/* QR Code Preview */}
        <Col flex="none">
          <div
            style={{
              width: 60,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f9fafb",
              borderRadius: 8,
            }}
          >
            {qr.previewImage ? (
              <img
                src={qr.previewImage}
                alt={qr.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 6,
                }}
              />
            ) : (
              <Text type="secondary" style={{ fontSize: 10, textAlign: "center" }}>
                No Preview
              </Text>
            )}
          </div>
        </Col>

        {/* Content */}
        <Col flex="auto">
          <div>
            {/* Title and Type */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              marginBottom: 6,
              minHeight: 24
            }}>
              <Title
                level={5}
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  lineHeight: 1.4,
                }}
                title={qr.name}
              >
                {qr.name}
              </Title>
              <Tag 
                color="blue" 
                style={{ 
                  textTransform: "uppercase", 
                  fontSize: 11, 
                  margin: 0,
                  height: 22,
                  lineHeight: "20px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500
                }}
              >
                {qr.type}
              </Tag>
            </div>

            {/* Content/URL */}
            <Text
              type="secondary"
              style={{
                display: "block",
                fontSize: 12,
                marginBottom: 12,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#8c8c8c",
                lineHeight: 1.4,
                minHeight: 16,
              }}
              title={qr.content}
            >
              {qr.content}
            </Text>

            {/* Stats */}
            <div style={{ 
              display: "flex", 
              gap: 16, 
              alignItems: "center",
              minHeight: 24,
              flexWrap: "wrap"
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 4,
                minHeight: 20
              }}>
                <Text strong style={{ 
                  color: "#667eea", 
                  fontSize: 14,
                  lineHeight: 1.2
                }}>
                  {qr.scanCount || 0}
                </Text>
                <Text type="secondary" style={{ 
                  fontSize: 12,
                  lineHeight: 1.2
                }}>
                  scans
                </Text>
              </div>
              <Tag 
                color={qr.status === 'active' ? "green" : "red"} 
                style={{ 
                  fontSize: 11, 
                  margin: 0,
                  height: 22,
                  lineHeight: "20px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500
                }}
              >
                {qr.status === 'active' ? "Active" : "Inactive"}
              </Tag>
              <Text type="secondary" style={{ 
                fontSize: 11,
                lineHeight: 1.2,
                whiteSpace: "nowrap"
              }}>
                {new Date(qr.createdAt).toLocaleDateString()}
              </Text>
            </div>
          </div>
        </Col>

        {/* Actions */}
        <Col flex="none" style={{ display: "flex", alignItems: "center" }}>
          <Space size={4} wrap={false}>
            <Tooltip title="Edit">
              <Button
                type="text"
                size="small"
                icon={<Edit size={14} />}
                onClick={() => navigate(`/edit/${qr._id}`)}
                style={{ 
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              />
            </Tooltip>

         

            <Tooltip title="Share">
              <Button
                type="text"
                size="small"
                icon={<Share2 size={14} />}
                onClick={() => onShare(qr)}
                style={{ 
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              />
            </Tooltip>

            <Tooltip title="Analytics">
              <Button
                type="text"
                size="small"
                icon={<BarChart3 size={14} />}
                onClick={() => onAnalytics(qr._id)}
                style={{ 
                  color: "#667eea",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              />
            </Tooltip>

            <Tooltip title="Open QR">
              <Button
                type="text"
                size="small"
                icon={<ExternalLink size={14} />}
                onClick={() => window.open(scanUrl, "_blank")}
                style={{ 
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Popconfirm
                title="Delete QR Code?"
                description="This action cannot be undone."
                onConfirm={() => onDelete(qr._id)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<Trash2 size={14} />}
                  style={{ 
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default QRCodeList;