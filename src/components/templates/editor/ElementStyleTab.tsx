import React from 'react';
import { Form, Input, Select, Slider, Row, Col, InputNumber } from 'antd';
import type { CardTemplate } from '../../../types/cardTemplates';

interface Props {
  template: CardTemplate;
  onChange: (template: CardTemplate) => void;
}

const { Option } = Select;

const ElementStyleTab: React.FC<Props> = ({ template, onChange }) => {
  const update = (patch: Partial<CardTemplate>) => onChange({ ...template, ...patch });

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Background Color">
            <Input value={template.settings.backgroundColor} onChange={(e) => update({ settings: { ...template.settings, backgroundColor: e.target.value } } as any)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Border Radius">
            <InputNumber value={template.settings.borderRadius} onChange={(v) => update({ settings: { ...template.settings, borderRadius: v as number } } as any)} min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Decorative Style">
        <Select value={(template as any).decorativeStyle} onChange={(v) => update({ ...(template as any), decorativeStyle: v })}>
          <Option value="none">None</Option>
          <Option value="dots">Dots</Option>
          <Option value="circles">Circles</Option>
          <Option value="lines">Lines</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Padding">
        <Slider min={0} max={80} value={template.settings.padding} onChange={(v) => update({ settings: { ...template.settings, padding: v } } as any)} />
      </Form.Item>
    </Form>
  );
};

export default ElementStyleTab;
