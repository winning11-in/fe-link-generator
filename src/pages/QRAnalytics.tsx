import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { qrCodeAPI } from '../services/api';
import type { Scan, Analytics } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const QRAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const [scans, setScans] = useState<Scan[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [scansData, analyticsData] = await Promise.all([
          qrCodeAPI.getScans(id),
          qrCodeAPI.getAnalytics(id),
        ]);
        setScans(scansData.scans);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Prepare chart data
  const browserData = analytics?.analytics.browsers
    ? Object.entries(analytics.analytics.browsers).map(([name, value]) => ({ name, value }))
    : [];

  const osData = analytics?.analytics.os
    ? Object.entries(analytics.analytics.os).map(([name, value]) => ({ name, value }))
    : [];

  const deviceData = analytics?.analytics.devices
    ? Object.entries(analytics.analytics.devices).map(([name, value]) => ({ name, value }))
    : [];

  const countryData = analytics?.analytics.countries
    ? Object.entries(analytics.analytics.countries).map(([name, value]) => ({ name, value }))
    : [];

  const scansByDateData = analytics?.analytics.scansByDate
    ? Object.entries(analytics.analytics.scansByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          QR Code Analytics
        </Typography>

        {/* Summary Cards */}
        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap' }}>
          <Card sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Scans
              </Typography>
              <Typography variant="h3">{analytics?.totalScans || 0}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unique Countries
              </Typography>
              <Typography variant="h3">{countryData.length}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Browsers
              </Typography>
              <Typography variant="h3">{browserData.length}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Devices
              </Typography>
              <Typography variant="h3">{deviceData.length}</Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Charts */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          {/* Scans by Date */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Scans Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scansByDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          {/* Browsers and OS */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Browsers
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {browserData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>

            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Operating Systems
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={osData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>

          {/* Countries and Devices */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Countries
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Device Types
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>
        </Stack>

        {/* Recent Scans Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Scans
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Browser</TableCell>
                  <TableCell>OS</TableCell>
                  <TableCell>IP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scans.slice(0, 20).map((scan) => (
                  <TableRow key={scan._id}>
                    <TableCell>
                      {new Date(scan.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {scan.location?.city && scan.location?.country ? (
                        <Chip
                          label={`${scan.location.city}, ${scan.location.country}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        'Unknown'
                      )}
                    </TableCell>
                    <TableCell>{scan.device?.type || 'Unknown'}</TableCell>
                    <TableCell>
                      {scan.browser?.name ? `${scan.browser.name} ${scan.browser.version || ''}` : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {scan.os?.name ? `${scan.os.name} ${scan.os.version || ''}` : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {scan.ip}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default QRAnalytics;
