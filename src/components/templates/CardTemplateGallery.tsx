import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Tag, Input, Select } from 'antd';
import { Edit3 } from 'lucide-react';
import type { CardTemplate } from '../../types/cardTemplates';
import { cardTemplates } from './cardTemplates';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface CardTemplateGalleryProps {
  onSelectTemplate: (template: CardTemplate) => void;
  selectedTemplateId?: string;
}

const CardTemplateGallery: React.FC<CardTemplateGalleryProps> = ({
  onSelectTemplate,
  selectedTemplateId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'business', label: 'Business' },
    { value: 'eco', label: 'Eco Friendly' },
    { value: 'tech', label: 'Technology' },
    { value: 'modern', label: 'Modern' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'creative', label: 'Creative' }
  ];

  const filteredTemplates = cardTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: CardTemplate['category']) => {
    const colors = {
      business: '#1890ff',
      eco: '#52c41a',
      tech: '#722ed1',
      modern: '#eb2f96',
      minimal: '#595959',
      creative: '#fa8c16'
    };
    return colors[category] || '#1890ff';
  };

  const renderTemplatePreview = (template: CardTemplate) => {
    const previewStyle: React.CSSProperties = {
      width: '100%',
      height: 200,
      backgroundColor: template.settings.backgroundColor,
      backgroundImage: template.settings.gradient 
        ? `linear-gradient(${template.settings.gradient.direction}, ${template.settings.gradient.colors.join(', ')})`
        : undefined,
      borderRadius: template.settings.borderRadius / 2,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: selectedTemplateId === template.id ? '3px solid #1890ff' : '1px solid #f0f0f0'
    };

    // Find main elements for preview
    const titleElement = template.elements.find(el => 
      el.type === 'text' && (el.id.includes('title') || el.id.includes('heading'))
    );
    const qrElement = template.elements.find(el => el.type === 'qrcode');

    return (
      <div style={previewStyle} onClick={() => onSelectTemplate(template)}>
        {/* Preview title */}
        {titleElement && (
          <div
            style={{
              fontSize: titleElement.fontSize ? titleElement.fontSize / 2 : 14,
              fontWeight: titleElement.fontWeight,
              color: titleElement.color,
              marginBottom: 8,
              textAlign: 'center'
            }}
          >
            {titleElement.text}
          </div>
        )}
        
        {/* QR placeholder */}
        {qrElement && (
          <div
            style={{
              width: qrElement.size.width / 3,
              height: qrElement.size.height / 3,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: qrElement.qrSettings?.cornerRadius || 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8
            }}
          >
            <div
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#000000',
                opacity: 0.8,
                background: `
                  repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 50% / 8px 8px,
                  repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 54px 54px / 8px 8px
                `
              }}
            />
          </div>
        )}
        
        {/* Template name overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 11,
            textAlign: 'center'
          }}
        >
          {template.name}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[0, 16]}>
        {/* Header */}
        <Col span={24}>
          <Title level={3}>Choose a Card Template</Title>
          <Text type="secondary">
            Select a professional template and customize it with your QR code and content
          </Text>
        </Col>

        {/* Filters */}
        <Col span={24}>
          <Card size="small">
            <Row gutter={16} align="middle">
              <Col flex="auto">
                <Search
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: 300 }}
                />
              </Col>
              <Col>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  style={{ minWidth: 150 }}
                >
                  {categories.map(category => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Templates Grid */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {filteredTemplates.map(template => (
              <Col key={template.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    border: selectedTemplateId === template.id ? '2px solid #1890ff' : undefined
                  }}
                  bodyStyle={{ padding: 12 }}
                  actions={[
                    <Button 
                      key="select"
                      type="primary" 
                      icon={<Edit3 />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template);
                      }}
                    >
                      Use Template
                    </Button>
                  ]}
                >
                  <div style={{ marginBottom: 12 }}>
                    {renderTemplatePreview(template)}
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <Title level={5} style={{ margin: 0, flex: 1 }}>
                        {template.name}
                      </Title>
                      <Tag 
                        color={getCategoryColor(template.category)}
                        style={{ marginLeft: 8 }}
                      >
                        {template.category}
                      </Tag>
                    </div>
                    
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {template.elements.length} elements • 
                      {template.settings.width}×{template.settings.height}px
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <Col span={24}>
            <Card>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Title level={4} type="secondary">No templates found</Title>
                <Text type="secondary">
                  Try adjusting your search terms or category filter
                </Text>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CardTemplateGallery;