import { Card, Button, Typography, message, Tooltip, Popconfirm } from "antd";
import { BarChart3, Trash2, Download, Share2, Edit } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import type { QRCode } from "../../types";
import { useQRDownload } from "../../hooks/useQRDownload";

const { Text, Title } = Typography;

interface QRCodeCardProps {
  qr: QRCode;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
}

const QRCodeCard = ({ qr, onAnalytics, onDelete }: QRCodeCardProps) => {
  const navigate = useNavigate();
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scanUrl = `${window.location.origin}/scan/${qr._id}`;
  
  // Use download hook
  const { handleDownload } = useQRDownload({ qr, scanUrl });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const customization = qr.customization;

    const errorCorrectionMap: Record<string, "L" | "M" | "Q" | "H"> = {
      L: "L",
      M: "M",
      Q: "Q",
      H: "H",
    };

    // Prepare dots options with gradient support
    const dotsOptions: any = {
      type: customization?.dotStyle || "square",
    };

    const qrColorGradient = customization?.qrColorGradient;
    if (qrColorGradient?.type === "solid") {
      dotsOptions.color = customization?.qrColor || "#000000";
    } else if (qrColorGradient?.type === "linear" && qrColorGradient.gradient) {
      dotsOptions.gradient = {
        type: "linear",
        rotation: (qrColorGradient.gradient.rotation || 0) * (Math.PI / 180),
        colorStops: qrColorGradient.gradient.colorStops,
      };
    } else if (qrColorGradient?.type === "radial" && qrColorGradient.gradient) {
      dotsOptions.gradient = {
        type: "radial",
        colorStops: qrColorGradient.gradient.colorStops,
      };
    } else {
      dotsOptions.color = customization?.qrColor || "#000000";
    }

    // Prepare background options
    const backgroundOptions: any = {};
    const bgColorGradient = customization?.bgColorGradient;
    
    if (customization?.bgImage) {
      backgroundOptions.color = "transparent";
    } else if (bgColorGradient?.type === "solid") {
      backgroundOptions.color = customization?.bgColor || "#ffffff";
    } else if (bgColorGradient?.type === "linear" && bgColorGradient.gradient) {
      backgroundOptions.gradient = {
        type: "linear",
        rotation: (bgColorGradient.gradient.rotation || 0) * (Math.PI / 180),
        colorStops: bgColorGradient.gradient.colorStops,
      };
    } else if (bgColorGradient?.type === "radial" && bgColorGradient.gradient) {
      backgroundOptions.gradient = {
        type: "radial",
        colorStops: bgColorGradient.gradient.colorStops,
      };
    } else {
      backgroundOptions.color = customization?.bgColor || "#ffffff";
    }

    const cornerColor = qrColorGradient?.type === "solid" 
      ? customization?.qrColor || "#000000"
      : qrColorGradient?.gradient?.colorStops?.[0]?.color || customization?.qrColor || "#000000";

    const qrCodeConfig: any = {
      width: 120,
      height: 120,
      data: scanUrl,
      margin: customization?.margin || 0,
      dotsOptions,
      backgroundOptions,
      cornersSquareOptions: {
        color: cornerColor,
        type: customization?.cornerSquareStyle || "square",
      },
      cornersDotOptions: {
        color: cornerColor,
        type: customization?.cornerDotStyle || "square",
      },
      qrOptions: {
        errorCorrectionLevel:
          errorCorrectionMap[customization?.errorLevel || "M"],
      },
    };

    // Only add image options if logo exists
    if (customization?.logo) {
      qrCodeConfig.imageOptions = {
        hideBackgroundDots: customization.removeBackground ?? true,
        imageSize: (customization.logoSize || 50) / 280,
        margin: customization.logoPadding || 5,
      };
      qrCodeConfig.image = customization.logo;
    }

    try {
      const qrCode = new QRCodeStyling(qrCodeConfig);

      container.innerHTML = "";
      qrCode.append(container);
      qrCodeRef.current = qrCode;
    } catch (error) {
      console.error("Error rendering QR code:", error);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [qr, scanUrl]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: qr.title,
          text: `Check out this QR code: ${qr.title}`,
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
  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        border: "1px solid #e8e8e8",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        background: "#ffffff",
      }}
      bodyStyle={{ padding: 0 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
        e.currentTarget.style.borderColor = "#667eea";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e8e8e8";
      }}
    >
      {/* QR Code Preview */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div ref={containerRef} style={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        </div>

        
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {/* Title */}
        <Title
          level={5}
          style={{
            margin: 0,
            marginBottom: 6,
            fontSize: 16,
            fontWeight: 600,
            color: "#1a1a1a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={qr.title}
        >
          {qr.title}
        </Title>

        {/* Data/URL */}
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
          }}
          title={qr.data}
        >
          {qr.data}
        </Text>

        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            background: "#fafafa",
            borderRadius: 6,
            padding: "10px 0",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #e8e8e8",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#667eea",
                lineHeight: 1,
              }}
            >
              {qr.scanCount || 0}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#8c8c8c",
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Scans
            </div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#667eea",
                lineHeight: 1,
              }}
            >
              {qr.type.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#8c8c8c",
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Type
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Edit">
            <Button
              type="text"
              shape="circle"
              icon={<Edit size={16} />}
              onClick={() => navigate(`/edit/${qr._id}`)}
              style={{
                flex: 1,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            />
          </Tooltip>

          <Tooltip title="Download">
            <Button
              type="text"
              shape="circle"
              icon={<Download size={16} />}
              onClick={handleDownload}
              style={{
                flex: 1,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            />
          </Tooltip>

          <Tooltip title="Share">
            <Button
              type="text"
              shape="circle"
              icon={<Share2 size={16} />}
              onClick={handleShare}
              style={{
                flex: 1,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            />
          </Tooltip>

          <Tooltip title="Analytics">
            <Button
              type="text"
              shape="circle"
              icon={<BarChart3 size={16} />}
              onClick={() => onAnalytics(qr._id)}
              style={{
                flex: 1,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#667eea",
                borderRadius: "10px",
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
                shape="circle"
                danger
                icon={<Trash2 size={16} />}
                style={{
                  flex: 1,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default QRCodeCard;
