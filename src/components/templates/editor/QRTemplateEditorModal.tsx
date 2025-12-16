import React, { useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import QRTemplateElementsTab from './QRTemplateElementsTab';
import QRTemplateStyleTab from './QRTemplateStyleTab';
import QRSettingsTab from './QRSettingsTab';
import type { QRTemplate } from '../../../types/qrCode';
import QRCodePreview from '../../qr/QRCodePreview';
import type { QRStyling } from '../../../types/qrCode';
import useQRTemplates from '../../../hooks/useQRTemplates';

const { TabPane } = Tabs;

interface Props {
  open: boolean;
  template: QRTemplate | null;
  styling: QRStyling;
  onClose: () => void;
  onSave: (t: QRTemplate) => void;
}

const QRTemplateEditorModal: React.FC<Props> = ({ open, template, styling, onClose, onSave }) => {
  const [draft, setDraft] = useState<QRTemplate | null>(template);
  const { updateTemplate } = useQRTemplates();

  React.useEffect(() => setDraft(template), [template]);

  if (!draft) return null;

  return (
    <Modal open={open} onCancel={onClose} title="Edit Template" width={900} footer={[
      <Button key="cancel" onClick={onClose}>Cancel</Button>,
      <Button key="save" type="primary" onClick={() => { onSave(draft); updateTemplate(draft); onClose(); }}>Save</Button>
    ]}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div>
          <Tabs defaultActiveKey="elements">
            <TabPane tab="Elements" key="elements">
              <QRTemplateElementsTab template={draft} onChange={setDraft as any} />
            </TabPane>
            <TabPane tab="Style" key="style">
              <QRTemplateStyleTab template={draft} onChange={setDraft as any} />
            </TabPane>
            <TabPane tab="QR Settings" key="qr">
              <QRSettingsTab template={draft as any} onChange={setDraft as any} />
            </TabPane>
          </Tabs>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Live Preview</h4>
          <div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
            <QRCodePreview content={window.location.href} template={draft} styling={styling} editable={false} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QRTemplateEditorModal;
