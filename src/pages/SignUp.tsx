import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { Mail, Lock, User, QrCode, Palette, LineChart, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const { Title, Text } = Typography;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signup, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const onFinish = async (values: SignUpFormData) => {
    setLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      navigate('/dashboard');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      {/* Left Column - Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          top: '-100px',
          right: '-100px',
          backdropFilter: 'blur(10px)',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          bottom: '-80px',
          left: '-80px',
          backdropFilter: 'blur(10px)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <QrCode size={48} color="#fff" strokeWidth={2} />
            <Title level={2} style={{ 
              margin: '0 0 0 16px', 
              color: '#fff',
              fontSize: '32px',
              fontWeight: 700,
            }}>
              QR Generator
            </Title>
          </div>

          <Title level={3} style={{ 
            color: '#fff', 
            marginBottom: '24px',
            fontSize: '28px',
            fontWeight: 300,
            lineHeight: 1.4,
          }}>
            Start Creating Professional QR Codes Today
          </Title>

          <Text style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '16px',
            display: 'block',
            marginBottom: '48px',
            lineHeight: 1.6,
          }}>
            Join thousands of businesses using our platform to create, customize, and track their QR codes.
          </Text>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: Palette, title: 'Custom Designs', desc: 'Personalize with colors and logos' },
              { icon: LineChart, title: 'Detailed Analytics', desc: 'Monitor performance in real-time' },
              { icon: Globe, title: 'Global Reach', desc: 'Works anywhere, anytime' },
            ].map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '12px',
                  backdropFilter: 'blur(10px)',
                }}>
                  <feature.icon size={24} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <Text style={{ 
                    color: '#fff', 
                    fontSize: '16px', 
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px',
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '14px',
                  }}>
                    {feature.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: '#ffffff',
      }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <Title level={2} style={{ 
              margin: 0, 
              color: '#1e293b',
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '8px',
            }}>
              Create Account
            </Title>
            <Text style={{ 
              color: '#64748b',
              fontSize: '16px',
            }}>
              Get started with your free account
            </Text>
          </div>

          {/* Form */}
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label={<span style={{ color: '#334155', fontWeight: 500, fontSize: '14px' }}>Full Name</span>}
              name="name"
              rules={[
                { required: true, message: 'Name is required' },
                { min: 2, message: 'Name must be at least 2 characters' },
              ]}
            >
              <Input
                prefix={<User size={18} style={{ color: '#94a3b8' }} />}
                placeholder="Enter your full name"
                size="large"
                style={{
                  borderRadius: '8px',
                  height: '48px',
                  fontSize: '15px',
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#334155', fontWeight: 500, fontSize: '14px' }}>Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email address' },
              ]}
            >
              <Input
                prefix={<Mail size={18} style={{ color: '#94a3b8' }} />}
                placeholder="Enter your email"
                size="large"
                style={{
                  borderRadius: '8px',
                  height: '48px',
                  fontSize: '15px',
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#334155', fontWeight: 500, fontSize: '14px' }}>Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} style={{ color: '#94a3b8' }} />}
                placeholder="Create a password"
                size="large"
                style={{
                  borderRadius: '8px',
                  height: '48px',
                  fontSize: '15px',
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#334155', fontWeight: 500, fontSize: '14px' }}>Confirm Password</span>}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} style={{ color: '#94a3b8' }} />}
                placeholder="Confirm your password"
                size="large"
                style={{
                  borderRadius: '8px',
                  height: '48px',
                  fontSize: '15px',
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '24px', marginTop: '8px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
                style={{
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                }}
              >
                Create Account
              </Button>
            </Form.Item>

            <div style={{ 
              textAlign: 'center',
              paddingTop: '24px',
              borderTop: '1px solid #e2e8f0',
            }}>
              <Text style={{ 
                color: '#64748b',
                fontSize: '15px',
              }}>
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  style={{ 
                    color: '#667eea', 
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Sign In
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>

      {/* Responsive Design */}
      <style>{`
        @media (max-width: 1024px) {
          .ant-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
               