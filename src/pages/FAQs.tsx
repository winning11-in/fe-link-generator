import { Collapse, Typography, Card } from 'antd';
import { HelpCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

const { Title, Paragraph ,Text } = Typography;
const { Panel } = Collapse;

const FAQs = () => {
  const faqs = [
    {
      question: 'What is a QR code?',
      answer: 'A QR code (Quick Response code) is a two-dimensional barcode that can be scanned using a smartphone camera or QR code reader to quickly access information, websites, or other digital content.',
    },
    {
      question: 'How do I create a QR code?',
      answer: 'Simply click on "Create QR Code" button, select the type of content (URL, text, email, etc.), enter your information, customize the design if desired, and click save. Your QR code will be generated instantly.',
    },
    {
      question: 'Can I customize the design of my QR code?',
      answer: 'Yes! You can customize colors, add gradients, change dot styles, add logos, apply frames, shadows, and much more. Choose from our pre-designed templates or create your own unique design.',
    },
    {
      question: 'What types of QR codes can I create?',
      answer: 'You can create QR codes for URLs, plain text, emails, phone numbers, SMS, WiFi credentials, locations, UPI payments, vCards, and social media links (Instagram, Facebook, YouTube, WhatsApp).',
    },
    {
      question: 'Are the QR codes I create permanent?',
      answer: 'Yes, once created, your QR codes are permanent and will continue to work. However, you can edit or delete them from your dashboard at any time.',
    },
    {
      question: 'Can I track QR code scans?',
      answer: 'Yes! Every QR code you create comes with built-in analytics. You can track the number of scans, devices used, locations, browsers, and scan times from the Analytics section.',
    },
    {
      question: 'What is the maximum file size for logo and background images?',
      answer: 'To ensure optimal performance and loading times, logo and background images are limited to 100 KB each. We recommend using compressed JPEG or PNG images.',
    },
    {
      question: 'Can I download my QR codes?',
      answer: 'Yes, you can download your QR codes in high quality PNG format. The downloaded image will include all customizations like shadows, frames, and background images.',
    },
    {
      question: 'What happens if I delete a QR code?',
      answer: 'When you delete a QR code, it will be permanently removed from your account and will stop working. Any printed or distributed copies will no longer redirect to the intended destination.',
    },
    {
      question: 'Is there a limit to how many QR codes I can create?',
      answer: 'Premium users have unlimited QR code creation. You can create as many QR codes as you need for your personal or business use.',
    },
    {
      question: 'How do I edit an existing QR code?',
      answer: 'Click on the edit icon on your QR code card in the dashboard. You can modify the content, design, and customization settings. Save your changes to update the QR code.',
    },
    {
      question: 'What error correction level should I use?',
      answer: 'Error correction allows QR codes to be readable even if partially damaged. We recommend "H" (High) for QR codes with logos or complex designs, "M" (Medium) for standard use, and "L" (Low) for simple QR codes without logos.',
    },
  ];

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
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
          <HelpCircle size={32} color="#ffffff" />
        </div>
        <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
          Frequently Asked Questions
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16 }}>
          Find answers to common questions about our QR code generator
        </Paragraph>
      </div>

      {/* FAQ Content */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Collapse
          accordion
          bordered={false}
          expandIconPosition="end"
          style={{
            background: 'transparent',
          }}
        >
          {faqs.map((faq, index) => (
            <Panel
              header={
                <Text strong style={{ fontSize: 16 }}>
                  {faq.question}
                </Text>
              }
              key={index}
              style={{
                marginBottom: 8,
                borderRadius: 8,
                border: '1px solid #f0f0f0',
              }}
            >
              <Paragraph style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.8 }}>
                {faq.answer}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Card>

      {/* Still have questions */}
      <Card
        style={{
          marginTop: 32,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          textAlign: 'center',
        }}
      >
        <Title level={4} style={{ color: '#fff', margin: 0, marginBottom: 8 }}>
          Still have questions?
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0, marginBottom: 16 }}>
          Can't find the answer you're looking for? Please get in touch with our team.
        </Paragraph>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: '#fff',
            color: '#667eea',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Contact Us
        </a>
      </Card>
    </div>
    </AppLayout>
  );
};

export default FAQs;
