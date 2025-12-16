import React from 'react';
import { Form, Select, Input } from 'antd';
import type { CardTemplate } from '../../../types/cardTemplates';

interface Props { template: CardTemplate; onChange: (t: CardTemplate) => void }

const QRSettingsTab: React.FC<Props> = ({ template, onChange }) => {
  const pos = (template as any).qrPosition || 'center';
  const set = (patch: any) => onChange({ ...(template as any), ...patch });

  return (
    <Form layout="vertical">
      <Form.Item label="QR Label (below QR code)">
        <Input value={(template as any).qrLabel || 'Scan for details'} onChange={(e) => set({ qrLabel: e.target.value })} />
      </Form.Item>

      <Form.Item label="QR Position">
        <Select value={pos} onChange={(v) => set({ qrPosition: v })}>
          <Select.Option value="top">Top</Select.Option>
          <Select.Option value="center">Center</Select.Option>
          <Select.Option value="bottom">Bottom</Select.Option>
          <Select.Option value="left">Left (Horizontal)</Select.Option>
          <Select.Option value="right">Right (Horizontal)</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default QRSettingsTab;
