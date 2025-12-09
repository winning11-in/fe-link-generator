import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const { Title, Text } = Typography;

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const onFinish = async (values: SignInFormData) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: '0 20px' }}>
        <Card
          style={{
            borderRadius: 16,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
          bodyStyle={{ padding: 48 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: '#6366f1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Lock size={28} color="white" />
            </div>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome Back
            </Title>
            <Text type="secondary">Sign in to continue to QR Generator</Text>
          </div>

          <Form
            name="signin"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email address' },
              ]}
            >
              <Input
                prefix={<Mail size={18} />}
                placeholder="Email Address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{
                  height: 48,
                  background: '#6366f1',
                  borderColor: '#6366f1',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Sign In
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#6366f1', fontWeight: 600 }}>
                  Sign Up
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
