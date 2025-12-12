import { useState, useEffect } from 'react';
import { Typography, Row, Col, message, Skeleton, Card } from 'antd';
import { Zap, Users, QrCode as QrCodeIcon, TrendingUp } from 'lucide-react';
import { qrCodeAPI, scansAPI } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import StatCard from '../components/analytics/StatCard';
import ScansOverTimeChart from '../components/analytics/ScansOverTimeChart';
import DeviceBreakdownChart from '../components/analytics/DeviceBreakdownChart';
import UniqueVisitorsChart from '../components/analytics/UniqueVisitorsChart';

const { Title, Text } = Typography;

const formatISODateToDisplay = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
};

const normalizeToISODate = (timestamp?: string) => {
  if (!timestamp) return null;
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().split('T')[0];
};

const buildDailySeries = (scans: any[]) => {
  const dailyMap = new Map<string, { scanCount: number; ips: Set<string> }>();

  scans.forEach((scan) => {
    const ts = scan?.timestamp || scan?.createdAt || scan?.updatedAt;
    const isoDate = normalizeToISODate(ts);
    if (!isoDate) return;

    if (!dailyMap.has(isoDate)) {
      dailyMap.set(isoDate, { scanCount: 0, ips: new Set<string>() });
    }

    const entry = dailyMap.get(isoDate)!;
    entry.scanCount += 1;
    if (scan?.ip) {
      entry.ips.add(scan.ip);
    }
  });

  const sortedDates = Array.from(dailyMap.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const scansOverTimeData = sortedDates.map((date) => {
    const entry = dailyMap.get(date)!;
    return {
      name: formatISODateToDisplay(date),
      scans: entry.scanCount,
    };
  });

  const uniqueVisitorsData = sortedDates.map((date) => {
    const entry = dailyMap.get(date)!;
    return {
      name: formatISODateToDisplay(date),
      visitors: entry.ips.size,
    };
  });

  return { scansOverTimeData, uniqueVisitorsData };
};

const Analytics = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    uniqueVisitors: 0,
    qrCodes: 0,
    engagementRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [scansOverTime, setScansOverTime] = useState<any[]>([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState<any[]>([]);
  const [uniqueVisitorsData, setUniqueVisitorsData] = useState<any[]>([]);

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
      const uniqueIPs = new Set(scans.map((scan: any) => scan.ip));
      const uniqueVisitors = uniqueIPs.size;

      // Calculate total scans
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

      const { scansOverTimeData, uniqueVisitorsData } = buildDailySeries(scans);
      setScansOverTime(scansOverTimeData);

      // Process device breakdown
      const deviceCounts: any = {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      };

      scans.forEach((scan: any) => {
        const deviceType = scan.device?.type?.toLowerCase() || 'desktop';
        if (deviceType === 'mobile' || deviceType === 'smartphone') {
          deviceCounts.mobile++;
        } else if (deviceType === 'tablet') {
          deviceCounts.tablet++;
        } else {
          deviceCounts.desktop++;
        }
      });

      const total = scans.length || 1;
      setDeviceBreakdown([
        {
          name: 'Mobile',
          value: deviceCounts.mobile,
          percentage: Math.round((deviceCounts.mobile / total) * 100),
        },
        {
          name: 'Desktop',
          value: deviceCounts.desktop,
          percentage: Math.round((deviceCounts.desktop / total) * 100),
        },
        {
          name: 'Tablet',
          value: deviceCounts.tablet,
          percentage: Math.round((deviceCounts.tablet / total) * 100),
        },
      ]);

      // Process unique visitors over time
      setUniqueVisitorsData(uniqueVisitorsData);
    } catch {
      message.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div style={{  margin: '0 auto' }}>
           <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 ,marginTop:0}}>
              Analytics
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Track your QR code performance and visitor engagement
            </Text>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div>
              {/* Stats Cards Skeleton */}
              <Row gutter={[24, 24]}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Col key={index} xs={24} sm={12} lg={6}>
                    <Card
                      style={{
                        borderRadius: 12,
                        border: "1px solid #e8e8e8",
                        height: 120,
                      }}
                      bodyStyle={{ padding: 20 }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <Skeleton.Input active size="small" style={{ width: 80, height: 16, marginBottom: 8 }} />
                          <Skeleton.Input active size="large" style={{ width: 60, height: 24 }} />
                        </div>
                        <Skeleton.Avatar shape="square" size={40} active />
                      </div>
                      <Skeleton.Input active size="small" style={{ width: 50, height: 14 }} />
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Charts Section Skeleton */}
              <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                {/* Scans Over Time Chart Skeleton */}
                <Col xs={24} lg={16}>
                  <Card
                    style={{
                      borderRadius: 12,
                      border: "1px solid #e8e8e8",
                      height: 400,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <Skeleton.Input active style={{ width: 200, height: 24, marginBottom: 20 }} />
                    <Skeleton.Node active style={{ width: '100%', height: 300 }}>
                      <div style={{ 
                        width: '100%', 
                        height: 300, 
                        background: '#f5f5f5', 
                        borderRadius: 8
                      }} />
                    </Skeleton.Node>
                  </Card>
                </Col>

                {/* Device Breakdown Chart Skeleton */}
                <Col xs={24} lg={8}>
                  <Card
                    style={{
                      borderRadius: 12,
                      border: "1px solid #e8e8e8",
                      height: 400,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <Skeleton.Input active style={{ width: 150, height: 24, marginBottom: 20 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                      <Skeleton.Avatar size={120} active />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Skeleton.Avatar size={12} active />
                              <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
                            </div>
                            <Skeleton.Input active size="small" style={{ width: 30, height: 16 }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>

                {/* Unique Visitors Chart Skeleton */}
                <Col xs={24}>
                  <Card
                    style={{
                      borderRadius: 12,
                      border: "1px solid #e8e8e8",
                      height: 300,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <Skeleton.Input active style={{ width: 180, height: 24, marginBottom: 20 }} />
                    <Skeleton.Node active style={{ width: '100%', height: 200 }}>
                      <div style={{ 
                        width: '100%', 
                        height: 200, 
                        background: '#f5f5f5', 
                        borderRadius: 8
                      }} />
                    </Skeleton.Node>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <>
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

              {/* Charts Section */}
              <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                {/* Scans Over Time */}
                <Col xs={24} lg={16}>
                  <ScansOverTimeChart data={scansOverTime} />
                </Col>

                {/* Device Breakdown */}
                <Col xs={24} lg={8}>
                  <DeviceBreakdownChart data={deviceBreakdown} />
                </Col>

                {/* Unique Visitors Chart */}
                <Col xs={24}>
                  <UniqueVisitorsChart data={uniqueVisitorsData} />
                </Col>
              </Row>
            </>
          )}
        </div>
      </AppLayout>
    );
  };
  
  export default Analytics;
