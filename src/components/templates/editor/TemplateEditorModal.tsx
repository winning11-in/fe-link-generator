import React, { useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import ElementsTab from './ElementsTab';
import ElementStyleTab from './ElementStyleTab';
import CTAButtonTab from './CTAButtonTab';
import QRSettingsTab from './QRSettingsTab';
import LivePreviewPanel from './LivePreviewPanel';
import type { CardTemplate } from '../../../types/cardTemplates';

const { TabPane } = Tabs;

interface Props {
  open: boolean;
  template: CardTemplate | null;
  onClose: () => void;
  onSave: (template: CardTemplate) => void;
}

const TemplateEditorModal: React.FC<Props> = ({ open, template, onClose, onSave }) => {
  const [draft, setDraft] = useState<CardTemplate | null>(template);

  React.useEffect(() => setDraft(template), [template]);

  if (!draft) return null;

  return (
    <Modal open={open} onCancel={onClose} title="Template Editor" width={900} footer={[
      <Button key="cancel" onClick={onClose}>Cancel</Button>,
      <Button key="save" type="primary" onClick={() => { onSave(draft); onClose(); }}>Save</Button>
    ]}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div>
          <Tabs defaultActiveKey="elements">
            <TabPane tab="Elements" key="elements">
              <ElementsTab template={draft} onChange={setDraft as any} />
            </TabPane>
            <TabPane tab="Element Style" key="style">
              <ElementStyleTab template={draft} onChange={setDraft as any} />
            </TabPane>
            <TabPane tab="CTA Button" key="cta">
              <CTAButtonTab template={draft} onChange={setDraft as any} />
            </TabPane>
            <TabPane tab="QR Settings" key="qr">
              <QRSettingsTab template={draft} onChange={setDraft as any} />
            </TabPane>
          </Tabs>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Live Preview</h4>
          <LivePreviewPanel template={draft} />
        </div>
      </div>
    </Modal>
  );
};

export default TemplateEditorModal;
