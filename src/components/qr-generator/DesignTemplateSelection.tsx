import { Card, Row, Col, Typography, Tag, Segmented } from 'antd';
import { useState } from 'react';
import { designTemplates, type DesignTemplate } from './designTemplates';

const { Text } = Typography;

interface DesignTemplateSelectionProps {
  onTemplateSelect: (template: DesignTemplate) => void;
}

const DesignTemplateSelection = ({ onTemplateSelect }: DesignTemplateSelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Business', value: 'business' },
    { label: 'Creative', value: 'creative' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Vibrant', value: 'vibrant' },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? designTemplates
      : designTemplates.filter((t) => t.category === selectedCategory);

  const handleTemplateClick = (template: DesignTemplate) => {
    setSelectedTemplateId(template.id);
    onTemplateSelect(template);
  };

  return (
    <div>
      <Segmented
        options={categories}
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value as string)}
        block
        style={{ marginBottom: 16 }}
      />

      <Row gutter={[12, 12]}>
        {filteredTemplates.map((template) => (
          <Col xs={12} sm={8} md={6} key={template.id}>
            <Card
              hoverable
              onClick={() => handleTemplateClick(template)}
              style={{
                borderRadius: 8,
                border:
                  selectedTemplateId === template.id
                    ? '2px solid #6366f1'
                    : '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 8,
                }}
              >
                <template.preview size={32} strokeWidth={1.5} />
              </div>
              <Text
                strong
                style={{
                  fontSize: 12,
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                {template.name}
              </Text>
              <Tag
                color={
                  template.category === 'business'
                    ? 'blue'
                    : template.category === 'creative'
                    ? 'purple'
                    : template.category === 'minimal'
                    ? 'default'
                    : 'magenta'
                }
                style={{ fontSize: 10 }}
              >
                {template.category}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DesignTemplateSelection;
