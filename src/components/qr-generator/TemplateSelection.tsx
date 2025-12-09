import { Card, Row, Col, Typography } from 'antd';
import { templates } from './templates';
import type { QRTemplate } from './templates';

const { Text } = Typography;

interface TemplateSelectionProps {
  selectedTemplate: QRTemplate;
  onTemplateSelect: (template: QRTemplate) => void;
}

const TemplateSelection = ({ selectedTemplate, onTemplateSelect }: TemplateSelectionProps) => {
  return (
    <Row gutter={[12, 12]}>
      {templates.map((template: QRTemplate) => {
        const Icon = template.icon;
        return (
          <Col xs={12} sm={8} md={6} key={template.id}>
            <Card
              hoverable
              onClick={() => onTemplateSelect(template)}
              style={{
                borderRadius: 8,
                border: selectedTemplate.id === template.id ? '2px solid #6366f1' : '1px solid #e5e7eb',
                background: selectedTemplate.id === template.id ? '#f0f0ff' : 'white',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              bodyStyle={{ padding: '16px 8px' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: selectedTemplate.id === template.id ? '#6366f1' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    size={20}
                    color={selectedTemplate.id === template.id ? 'white' : '#6b7280'}
                  />
                </div>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: selectedTemplate.id === template.id ? 600 : 400,
                    color: selectedTemplate.id === template.id ? '#6366f1' : '#374151',
                  }}
                >
                  {template.name}
                </Text>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default TemplateSelection;
