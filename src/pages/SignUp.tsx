import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  Stack,
  Avatar,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setError('');

    try {
      await signup(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
          
          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start creating amazing QR codes today
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                id="name"
                label="Full Name"
                autoComplete="name"
                autoFocus
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match'
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  mt: 1,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/signin"
                  underline="hover"
                  fontWeight="600"
                  sx={{ color: 'primary.main' }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
