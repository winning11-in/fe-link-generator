import { Typography } from 'antd';
import TemplateSelection from '../TemplateSelection';
import type { QRTemplate } from '../templates';

const { Title, Text } = Typography;

interface QRTypeStepProps {
  selectedTemplate: QRTemplate;
  onTemplateSelect: (template: QRTemplate) => void;
  isEditMode: boolean;
}

const QRTypeStep = ({ selectedTemplate, onTemplateSelect, isEditMode }: QRTypeStepProps) => {
  return (
    <div>
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        Choose QR Type {isEditMode && <Text type="secondary" style={{ fontSize: 14, fontWeight: 400 }}>(Cannot be changed)</Text>}
      </Title>
      <div style={{ opacity: isEditMode ? 0.6 : 1, pointerEvents: isEditMode ? 'none' : 'auto' }}>
        <TemplateSelection
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
        />
      </div>
    </div>
  );
};

export default QRTypeStep;
