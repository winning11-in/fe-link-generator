/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { qrCodeAPI } from '../services/api';

const ScanRedirect = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    const trackAndRedirect = async () => {
      if (!id) {
        setError('Invalid QR code');
        return;
      }

      try {
        // Track the scan
        await qrCodeAPI.incrementScan(id);

        // Get QR code details
        const response = await qrCodeAPI.getOne(id);
        const qrCode = response.qrCode;

        if (qrCode && qrCode.data) {
          // Redirect to the actual URL
          window.location.href = qrCode.data;
        } else {
          setError('QR code data not found');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to process QR code');
      }
    };

    trackAndRedirect();
  }, [id]);

  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Redirecting...
        </Typography>
      </Box>
    </Container>
  );
};

export default ScanRedirect;
