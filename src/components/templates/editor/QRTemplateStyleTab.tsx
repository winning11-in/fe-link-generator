import React from 'react';
import { Form, Input, InputNumber, ColorPicker, Slider } from 'antd';
import type { QRTemplate } from '../../../types/qrCode';

interface Props { template: QRTemplate; onChange: (t: QRTemplate) => void }

const QRTemplateStyleTab: React.FC<Props> = ({ template, onChange }) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Background Color">
        <Input value={template.backgroundColor} onChange={(e) => onChange({ ...template, backgroundColor: e.target.value })} />
      </Form.Item>

      <Form.Item label="Text Color">
        <Input value={template.textColor} onChange={(e) => onChange({ ...template, textColor: e.target.value })} />
      </Form.Item>

      <Form.Item label="Title Size">
        <InputNumber min={12} max={48} value={template.titleFontSize} onChange={(v) => onChange({ ...template, titleFontSize: v as number })} />
      </Form.Item>

      <Form.Item label="Subtitle Size">
        <InputNumber min={10} max={28} value={template.subtitleFontSize} onChange={(v) => onChange({ ...template, subtitleFontSize: v as number })} />
      </Form.Item>
    </Form>
  );
};

export default QRTemplateStyleTab;
