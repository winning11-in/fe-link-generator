import React from 'react';
import TemplatePreviewMini from '../TemplatePreviewMini';
import type { CardTemplate } from '../../../types/cardTemplates';

interface Props { template: CardTemplate }

const LivePreviewPanel: React.FC<Props> = ({ template }) => {
  return (
    <div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
      <TemplatePreviewMini template={template} scale={0.5} />
    </div>
  );
};

export default LivePreviewPanel;
