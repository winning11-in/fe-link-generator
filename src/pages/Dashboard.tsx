/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  IconButton,
  Stack,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  BarChart as BarChartIcon,
  QrCode as QrCodeIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../hooks/useAuth';
import { qrCodeAPI } from '../services/api';
import type { QRCode } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<{
    title: string;
    data: string;
    type: 'url' | 'text' | 'email' | 'phone';
  }>({
    title: '',
    data: '',
    type: 'url',
  });

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await qrCodeAPI.getAll();
      setQrCodes(response.qrCodes || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch QR codes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQRCode = async () => {
    try {
      setError('');
      if (!formData.title || !formData.data) {
        setError('Title and data are required');
        return;
      }
      
      await qrCodeAPI.create(formData);
      setSuccess('QR Code created successfully!');
      setOpenDialog(false);
      setFormData({ title: '', data: '', type: 'url' });
      fetchQRCodes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create QR code');
    }
  };

  const handleDeleteQRCode = async (id: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) return;
    
    try {
      await qrCodeAPI.delete(id);
      setSuccess('QR Code deleted successfully!');
      fetchQRCodes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete QR code');
    }
  };

  const handleCopyLink = (data: string) => {
    navigator.clipboard.writeText(data);
    setSuccess('Link copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                QR Code Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome, {user?.name || 'User'}!
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Create QR Code
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* QR Codes Grid */}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : qrCodes?.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <QrCodeIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No QR Codes Yet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Create your first QR code to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Create QR Code
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {qrCodes?.map((qr) => (
              <Card key={qr._id} elevation={2}>
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center">
                    {/* QR Code Preview */}
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'white',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <QRCodeSVG 
                        value={`${window.location.origin}/scan/${qr._id}`} 
                        size={100} 
                      />
                    </Box>

                    {/* QR Code Info */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {qr.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {qr.data}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label={qr.type} size="small" color="primary" />
                        <Chip
                          label={`${qr.scanCount || 0} scans`}
                          size="small"
                          color="success"
                        />
                        <Chip
                          label={qr.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          color={qr.isActive ? 'success' : 'default'}
                        />
                      </Stack>
                    </Box>

                    {/* Actions */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleCopyLink(qr.data)}
                        title="Copy Link"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/qr/${qr._id}/analytics`)}
                        title="View Analytics"
                      >
                        <BarChartIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteQRCode(qr._id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* Create QR Code Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New QR Code</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My Website Link"
              />
              
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <MenuItem value="url">URL</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Data"
                fullWidth
                multiline
                rows={3}
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                placeholder={
                  formData.type === 'url'
                    ? 'https://example.com'
                    : formData.type === 'email'
                    ? 'email@example.com'
                    : formData.type === 'phone'
                    ? '+1234567890'
                    : 'Your text here'
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleCreateQRCode}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Dashboard;
