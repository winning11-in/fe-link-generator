import React from 'react';
import { List, Button, Input, Space } from 'antd';
import type { CardTemplate, CardElement } from '../../../types/cardTemplates';

interface Props {
  template: CardTemplate;
  onChange: (template: CardTemplate) => void;
}

const ElementsTab: React.FC<Props> = ({ template, onChange }) => {
  const addText = (kind = 'Text') => {
    const el: CardElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      position: { x: 20, y: 20 },
      size: { width: 200, height: 24 },
      zIndex: 5,
      text: kind,
      fontSize: 14,
      fontWeight: '400',
      color: '#ffffff',
      textAlign: 'left'
    };
    onChange({ ...template, elements: [...template.elements, el] });
  };

  const remove = (id: string) => {
    onChange({ ...template, elements: template.elements.filter(e => e.id !== id) });
  };

  const updateText = (id: string, value: string) => {
    onChange({ ...template, elements: template.elements.map(e => e.id === id ? ({ ...e, text: value }) : e) });
  };

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={() => addText('Title')}>T Title</Button>
        <Button onClick={() => addText('Subtitle')}>T Subtitle</Button>
        <Button onClick={() => addText('Text')}>T Text</Button>
      </Space>

      <List
        dataSource={template.elements}
        renderItem={(el: any) => (
          <List.Item actions={[<Button danger size="small" onClick={() => remove(el.id)}>Delete</Button>] }>
            <div style={{ width: '100%' }}>
              <strong>{el.type}</strong> — <Input size="small" value={el.text || ''} onChange={(e) => updateText(el.id, e.target.value)} />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ElementsTab;
