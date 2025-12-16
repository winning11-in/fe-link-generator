import React from 'react';
import { Form, Input, Switch, InputNumber } from 'antd';
import type { CardTemplate } from '../../../types/cardTemplates';

interface Props { template: CardTemplate; onChange: (t: CardTemplate) => void }

const CTAButtonTab: React.FC<Props> = ({ template, onChange }) => {
  const show = (template as any).cta?.enabled ?? false;

  const setCta = (patch: any) => onChange({ ...(template as any), cta: { ...((template as any).cta || {}), ...patch } });

  return (
    <Form layout="vertical">
      <Form.Item label="Show CTA">
        <Switch checked={show} onChange={(v) => setCta({ enabled: v })} />
      </Form.Item>

      <Form.Item label="Button Text">
        <Input value={(template as any).cta?.text || 'Scan to Connect'} onChange={(e) => setCta({ text: e.target.value })} />
      </Form.Item>

      <Form.Item label="Background Color">
        <Input value={(template as any).cta?.bg || '#06b6d4'} onChange={(e) => setCta({ bg: e.target.value })} />
      </Form.Item>

      <Form.Item label="Border Radius">
        <InputNumber min={0} max={60} value={(template as any).cta?.radius || 24} onChange={(v) => setCta({ radius: v })} />
      </Form.Item>
    </Form>
  );
};

export default CTAButtonTab;
