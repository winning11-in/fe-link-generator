import React, { useState, useRef } from 'react';
import { Card, Input, ColorPicker, Slider, Button, Space, Divider } from 'antd';
import { Bold, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { CardTemplate, CardElement } from '../../types/cardTemplates';
import QRCodeStyling from 'qr-code-styling';

interface CardEditorProps {
  template: CardTemplate;
  qrData: string;
  qrCustomization?: any;
  onTemplateChange: (template: CardTemplate) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({
  template,
  qrData,
  qrCustomization,
  onTemplateChange
}) => {
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (qrData) {
      const qrElements = template.elements.filter(el => el.type === 'qrcode');
      
      qrElements.forEach((qrElement) => {
        const qrContainer = document.querySelector(`[data-qr-id="${qrElement.id}"]`) as HTMLElement;
        if (qrContainer) {
          const qr = new QRCodeStyling({
            width: qrElement.size.width - 20,
            height: qrElement.size.height - 20,
            data: qrData,
            dotsOptions: {
              color: qrCustomization?.qrColor || '#000000',
              type: qrCustomization?.dotStyle || 'rounded'
            },
            backgroundOptions: {
              color: qrCustomization?.bgColor || '#ffffff'
            },
            cornersSquareOptions: {
              color: qrCustomization?.qrColor || '#000000',
              type: qrCustomization?.cornerSquareStyle || 'extra-rounded'
            },
            cornersDotOptions: {
              color: qrCustomization?.qrColor || '#000000'
            }
          });

          qrContainer.innerHTML = '';
          qr.append(qrContainer);
        }
      });
    }
  }, [qrData, qrCustomization, template.elements]);

  const updateElement = (elementId: string, updates: Partial<CardElement>) => {
    const updatedTemplate = {
      ...template,
      elements: template.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      )
    };
    onTemplateChange(updatedTemplate);
  };

  const handleFinishEditing = () => {
    setEditingElement(null);
    setTempText('');
  };

  const selectedElement = editingElement 
    ? template.elements.find(el => el.id === editingElement) 
    : null;

  const renderElement = (element: CardElement) => {
    const isEditing = editingElement === element.id;
    
    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      zIndex: isEditing ? 100 : element.zIndex,
      cursor: element.type === 'text' ? 'text' : 'pointer',
      border: isEditing ? '2px solid #1890ff' : '1px dashed transparent',
      borderRadius: 4,
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onMouseEnter={(e) => {
              if (!isEditing) {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(24, 144, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditing) {
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (editingElement && editingElement !== element.id) {
                handleFinishEditing();
              }
              setEditingElement(element.id);
              setTempText(element.text || '');
            }}
          >
            {isEditing ? (
              <Input.TextArea
                autoFocus
                value={tempText}
                onChange={(e) => {
                  setTempText(e.target.value);
                  updateElement(element.id, { text: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleFinishEditing();
                  }
                  if (e.key === 'Escape') {
                    handleFinishEditing();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: element.fontFamily,
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  color: element.color,
                  textAlign: element.textAlign as any,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  height: '100%',
                  resize: 'none',
                  padding: 4,
                  borderRadius: 4
                }}
              />
            ) : (
              <span
                style={{
                  fontFamily: element.fontFamily,
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  color: element.color,
                  textAlign: element.textAlign,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: element.textAlign === 'center' ? 'center' : 
                                 element.textAlign === 'right' ? 'flex-end' : 'flex-start',
                  width: '100%',
                  height: '100%',
                  padding: 4
                }}
              >
                {element.text}
              </span>
            )}
          </div>
        );

      case 'qrcode':
        return (
          <div
            key={element.id}
            data-qr-id={element.id}
            onClick={(e) => e.stopPropagation()}
            style={{
              ...elementStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 10,
              cursor: 'default',
              border: 'none'
            }}
          />
        );

      case 'shape':
        return (
          <div
            key={element.id}
            onMouseEnter={(e) => {
              if (!isEditing) {
                (e.currentTarget as HTMLElement).style.outline = '2px solid rgba(24, 144, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditing) {
                (e.currentTarget as HTMLElement).style.outline = 'none';
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setEditingElement(element.id);
            }}
            style={{
              ...elementStyle,
              backgroundColor: element.fill && !/(gradient|radial|linear)/i.test(String(element.fill)) ? element.fill : undefined,
              backgroundImage: element.fill && /(gradient|radial|linear)/i.test(String(element.fill)) ? element.fill : undefined,
              backgroundRepeat: element.fill && /(gradient|radial|linear)/i.test(String(element.fill)) ? 'repeat' : undefined,
              borderRadius: element.shapeType === 'circle' ? '50%' : (element.cornerRadius || 0),
              outline: isEditing ? '2px solid #1890ff' : 'none'
            }}
          />
        );

      default:
        return null;
    }
  };

  const cardStyle: React.CSSProperties = {
    width: template.settings.width,
    height: template.settings.height,
    backgroundColor: template.settings.backgroundColor,
    backgroundImage: template.settings.gradient 
      ? `linear-gradient(${template.settings.gradient.direction}, ${template.settings.gradient.colors.join(', ')})`
      : undefined,
    padding: template.settings.padding,
    borderRadius: template.settings.borderRadius,
    boxShadow: template.settings.shadow 
      ? `${template.settings.shadowOffset.x}px ${template.settings.shadowOffset.y}px ${template.settings.shadowBlur}px ${template.settings.shadowColor}`
      : '0 4px 12px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'visible',
    margin: '20px auto'
  };

  return (
    <div>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 16, color: '#666' }}>
          Click on any text to edit it directly
        </div>
        <div 
          ref={cardRef} 
          style={cardStyle}
          onClick={handleFinishEditing}
        >
          {template.elements.map(renderElement)}
        </div>
      </Card>

      {/* Fixed Toolbar at bottom - stays open and doesn't close when interacting */}
      {selectedElement && (
        <Card 
          size="small" 
          style={{ marginTop: 16 }}
          title={`Editing: ${selectedElement.type === 'text' ? 'Text' : 'Shape'}`}
        >
          {selectedElement.type === 'text' && (
            <Space wrap size="middle">
              <Space>
                <span>Size:</span>
                <Slider
                  min={8}
                  max={72}
                  value={selectedElement.fontSize || 16}
                  onChange={(value) => updateElement(editingElement!, { fontSize: value })}
                  style={{ width: 120 }}
                />
                <span style={{ minWidth: 40 }}>{selectedElement.fontSize || 16}px</span>
              </Space>

              <Divider type="vertical" />

              <Space>
                <span>Color:</span>
                <ColorPicker
                  value={selectedElement.color || '#000000'}
                  onChange={(color) => updateElement(editingElement!, { color: color.toHexString() })}
                />
              </Space>

              <Divider type="vertical" />

              <Space>
                <Button
                  type={selectedElement.fontWeight === 'bold' ? 'primary' : 'default'}
                  icon={<Bold size={16} />}
                  onClick={() => updateElement(editingElement!, { 
                    fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' 
                  })}
                />
                <Button
                  type={selectedElement.textAlign === 'left' || !selectedElement.textAlign ? 'primary' : 'default'}
                  icon={<AlignLeft size={16} />}
                  onClick={() => updateElement(editingElement!, { textAlign: 'left' })}
                />
                <Button
                  type={selectedElement.textAlign === 'center' ? 'primary' : 'default'}
                  icon={<AlignCenter size={16} />}
                  onClick={() => updateElement(editingElement!, { textAlign: 'center' })}
                />
                <Button
                  type={selectedElement.textAlign === 'right' ? 'primary' : 'default'}
                  icon={<AlignRight size={16} />}
                  onClick={() => updateElement(editingElement!, { textAlign: 'right' })}
                />
              </Space>

              <Divider type="vertical" />

              <Button type="primary" onClick={handleFinishEditing}>Done</Button>
            </Space>
          )}

          {selectedElement.type === 'shape' && (
            <Space>
              <span>Fill Color:</span>
              <ColorPicker
                value={selectedElement.fill || '#000000'}
                onChange={(color) => updateElement(editingElement!, { fill: color.toHexString() })}
              />
              <Divider type="vertical" />
              <Button type="primary" onClick={handleFinishEditing}>Done</Button>
            </Space>
          )}
        </Card>
      )}
    </div>
  );
};

export default CardEditor;
