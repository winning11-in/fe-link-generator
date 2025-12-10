import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, Spin, Table, message, Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { qrCodeAPI, scansAPI } from "../services/api";
import AppLayout from "../components/layout/AppLayout";

const { Title, Text } = Typography;

const QRAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState<any>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatScanDate = (value?: string) => {
    if (!value) return "Unknown";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Unknown";
    const day = parsed.getDate().toString().padStart(2, "0");
    const month = (parsed.getMonth() + 1).toString().padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatScanTime = (value?: string) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatBrowser = (browser?: { name?: string; version?: string }) => {
    if (!browser?.name) return "Unknown";
    return browser.version
      ? `${browser.name} ${browser.version}`
      : browser.name;
  };

  const formatOS = (os?: { name?: string; version?: string }) => {
    if (!os?.name) return "Unknown";
    return os.version ? `${os.name} ${os.version}` : os.name;
  };

  const formatLocation = (location?: {
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  }) => {
    if (!location) return "Unknown";
    const placeParts = [
      location.city,
      location.region,
      location.country,
    ].filter(Boolean);
    const detailParts = [
      location.latitude !== undefined && location.longitude !== undefined
        ? `Lat ${location.latitude}, Lng ${location.longitude}`
        : null,
      location.timezone,
    ].filter(Boolean);

    const place = placeParts.length ? placeParts.join(", ") : "Unknown";
    return detailParts.length ? `${place} (${detailParts.join(" · ")})` : place;
  };

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
      title: "Scan Date",
      key: "scanDate",
      render: (_: any, record: any) =>
        formatScanDate(
          record?.createdAt || record?.timestamp || record?.updatedAt
        ),
    },
    {
      title: "Scan Time",
      key: "scanTime",
      render: (_: any, record: any) =>
        formatScanTime(
          record?.createdAt || record?.timestamp || record?.updatedAt
        ) || "Unknown",
    },
    {
      title: "Browser",
      key: "browser",
      render: (_: any, record: any) => formatBrowser(record?.browser),
    },
    {
      title: "Operating System",
      key: "os",
      render: (_: any, record: any) => formatOS(record?.os),
    },
    {
      title: "Device Type",
      key: "deviceType",
      render: (_: any, record: any) => record?.device?.type || "Unknown",
    },
    {
      title: "Device Vendor",
      key: "deviceVendor",
      render: (_: any, record: any) => record?.device?.vendor || "Unknown",
    },
    {
      title: "Device Model",
      key: "deviceModel",
      render: (_: any, record: any) => record?.device?.model || "Unknown",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
      render: (ip: string) => ip || "Unknown",
    },
    {
      title: "Location",
      key: "location",
      render: (_: any, record: any) => formatLocation(record?.location),
    },
  ];

  return (
    <AppLayout>
      <div style={{ margin: "0 auto" }}>
        <Button
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate("/dashboard")}
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
            <div style={{ marginBottom: 16 }}>
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
