import { Card, Form, Input, Button, message, Typography, Row, Col } from 'antd';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { contactAPI } from '../services/api';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await contactAPI.create(values);
      message.success('Thank you for contacting us! We will get back to you soon.');
      form.resetFields();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            marginBottom: 16,
          }}
        >
          <Mail size={32} color="#ffffff" />
        </div>
        <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
          Get in Touch
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16 }}>
          Have a question or feedback? We'd love to hear from you.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Contact Form */}
        <Col xs={24} lg={14}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Send us a Message
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  size="large"
                  placeholder="John Doe"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="john@example.com"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input
                  size="large"
                  placeholder="How can we help you?"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                  style={{
                    height: 48,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col xs={24} lg={10}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: 24,
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Contact Information
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
              Reach out to us through any of these channels
            </Paragraph>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} color="#667eea" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 4 }}>
                    Email
                  </Text>
                  <Text type="secondary">support@qrcodegenerator.com</Text>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} color="#667eea" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 4 }}>
                    Phone
                  </Text>
                  <Text type="secondary">+1 (555) 123-4567</Text>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} color="#667eea" />
                </div>
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 4 }}>
                    Address
                  </Text>
                  <Text type="secondary">
                    123 Tech Street, Suite 100
                    <br />
                    San Francisco, CA 94105
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          <Card
            style={{
              borderRadius: 12,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            <Title level={4} style={{ color: '#fff', marginTop: 0 }}>
              Business Hours
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Monday - Friday</Text>
                <Text strong style={{ color: '#fff' }}>
                  9:00 AM - 6:00 PM
                </Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Saturday</Text>
                <Text strong style={{ color: '#fff' }}>
                  10:00 AM - 4:00 PM
                </Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Sunday</Text>
                <Text strong style={{ color: '#fff' }}>
                  Closed
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    </AppLayout>
  );
};

export default Contact;
