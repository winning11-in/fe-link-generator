import React from 'react';
import { Form, Input, Space, Button, Select, InputNumber } from 'antd';
import type { QRTemplate, QRTemplateElement } from '../../../types/qrCode';

interface Props { template: QRTemplate; onChange: (t: QRTemplate) => void }

const weightOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Medium', value: 'medium' },
  { label: 'Semi Bold', value: 'semibold' },
  { label: 'Bold', value: 'bold' },
];

const QRTemplateElementsTab: React.FC<Props> = ({ template, onChange }) => {
  const elements = template.elements || [];

  const updateElement = (id: string, patch: Partial<QRTemplateElement>) => {
    const next = elements.map(el => el.id === id ? { ...el, ...patch } : el);
    onChange({ ...template, elements: next });
  };

  const addElement = () => {
    const newEl: QRTemplateElement = {
      id: `el_${Date.now()}`,
      type: 'text',
      text: 'New text',
      fontSize: 14,
      fontWeight: 'normal',
      color: template.textColor || '#000',
      letterSpacing: 0,
      opacity: 1,
      textAlign: template.textAlign || 'center',
    };
    onChange({ ...template, elements: [...elements, newEl] });
  };

  const removeElement = (id: string) => {
    onChange({ ...template, elements: elements.filter(e => e.id !== id) });
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={template.title} onChange={(e) => onChange({ ...template, title: e.target.value })} />
        </Form.Item>

        <Form.Item label="Subtitle">
          <Input value={template.subtitle} onChange={(e) => onChange({ ...template, subtitle: e.target.value })} />
        </Form.Item>

        <Form.Item label="Logo URL (optional)">
          <Input value={(template as any).logo || ''} onChange={(e) => onChange({ ...(template as any), logo: e.target.value })} />
        </Form.Item>

        <div style={{ marginTop: 12 }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="!m-0">Additional Elements</h4>
            <Button size="small" onClick={addElement}>Add Element</Button>
          </div>

          {elements.length === 0 && (
            <p className="text-sm text-muted">No additional elements. Add text blocks or logos to enrich the layout.</p>
          )}

          {elements.map((el) => (
            <div key={el.id} className="mb-3 p-3 border rounded">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className="flex items-center justify-between">
                  <strong>{el.type === 'logo' ? 'Logo' : 'Text'}</strong>
                  <Button size="small" danger onClick={() => removeElement(el.id)}>Remove</Button>
                </div>

                {el.type === 'text' && (
                  <>
                    <Input value={el.text} onChange={(e) => updateElement(el.id, { text: e.target.value })} />
                    <div className="flex gap-2">
                      <div style={{ flex: 1 }}>
                        <label className="text-xs">Font Size</label>
                        <InputNumber min={8} max={64} value={el.fontSize} onChange={(v) => updateElement(el.id, { fontSize: Number(v) })} style={{ width: '100%' }} />
                      </div>
                      <div style={{ width: 140 }}>
                        <label className="text-xs">Font Weight</label>
                        <Select options={weightOptions as any} value={el.fontWeight} onChange={(v) => updateElement(el.id, { fontWeight: v as any })} style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div style={{ flex: 1 }}>
                        <label className="text-xs">Color</label>
                        <Input value={el.color} onChange={(e) => updateElement(el.id, { color: e.target.value })} />
                      </div>
                      <div style={{ width: 140 }}>
                        <label className="text-xs">Letter Spacing</label>
                        <InputNumber min={-5} max={20} value={el.letterSpacing} onChange={(v) => updateElement(el.id, { letterSpacing: Number(v) })} style={{ width: '100%' }} />
                      </div>
                    </div>
                  </>
                )}
              </Space>
            </div>
          ))}
        </div>

        <Space>
          <Button onClick={() => onChange({ ...(template as any), showBorder: !template.showBorder })}>Toggle Border</Button>
        </Space>
      </Form>
    </div>
  );
};

export default QRTemplateElementsTab;
