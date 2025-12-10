import { Typography } from 'antd';
import DesignTemplateSelection from '../DesignTemplateSelection';
import type { DesignTemplate } from '../designTemplates';

const { Title ,Text} = Typography;

interface DesignTemplateStepProps {
  onTemplateSelect: (template: DesignTemplate) => void;
}

const DesignTemplateStep = ({ onTemplateSelect }: DesignTemplateStepProps) => {
  return (
    <div>
      <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
        Choose Design Template
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        Optional: Pick a pre-designed template to apply professional styling instantly
      </Text>
      <DesignTemplateSelection onTemplateSelect={onTemplateSelect} />
    </div>
  );
};

export default DesignTemplateStep;
