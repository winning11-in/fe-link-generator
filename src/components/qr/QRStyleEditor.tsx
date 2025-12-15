import React from 'react';
import { Typography, Slider, Radio, ColorPicker, Switch, Tabs, Segmented, Input, Upload, Button, Avatar, message } from 'antd';
import { uploadsAPI } from '../../services/api';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';
import type { QRStyling } from '../../types/qrCode';

const { Title, Text } = Typography;

interface QRStyleEditorProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const QRStyleEditor: React.FC<QRStyleEditorProps> = ({
  styling,
  onStyleChange,
}) => {
  const handleColorChange = (key: 'fgColor' | 'bgColor', color: Color) => {
    onStyleChange({
      ...styling,
      [key]: color.toHexString(),
    });
  };

  const tabItems = [
    {
      key: 'colors',
      label: 'Colors',
      children: (
        <div className="pt-4">
          <div className="mb-6">
            <Text strong className="block mb-3">QR Code Color Type</Text>
            <Segmented
              options={['Solid', 'Linear', 'Radial']}
              defaultValue="Solid"
              block
              className="mb-4"
            />
          </div>

          <div className="mb-6">
            <Text strong className="block mb-3">QR Code Color</Text>
            <div className="flex items-center gap-3">
              <ColorPicker
                value={styling.fgColor}
                onChange={(color) => handleColorChange('fgColor', color)}
                showText
                size="large"
              />
              <Text type="secondary">{styling.fgColor}</Text>
            </div>
          </div>

          <div className="mb-6">
            <Text strong className="block mb-3">Background Type</Text>
            <Segmented
              options={['Solid', 'Linear', 'Radial']}
              defaultValue="Solid"
              block
              className="mb-4"
            />
          </div>

          <div className="mb-6">
            <Text strong className="block mb-3">Background Color</Text>
            <div className="flex items-center gap-3">
              <ColorPicker
                value={styling.bgColor}
                onChange={(color) => handleColorChange('bgColor', color)}
                showText
                size="large"
              />
              <Text type="secondary">{styling.bgColor}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      children: (
        <div className="pt-4">
          <div className="mb-6">
            <Text strong className="block mb-3">
              Size: {styling.size}px
            </Text>
            <Slider
              min={100}
              max={400}
              value={styling.size}
              onChange={(value) => onStyleChange({ ...styling, size: value })}
            />
          </div>

          <div className="mb-6">
            <Text strong className="block mb-3">Error Correction Level</Text>
            <Radio.Group
              value={styling.level}
              onChange={(e) => onStyleChange({ ...styling, level: e.target.value })}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="L">Low (7%)</Radio.Button>
              <Radio.Button value="M">Medium (15%)</Radio.Button>
              <Radio.Button value="Q">Quartile (25%)</Radio.Button>
              <Radio.Button value="H">High (30%)</Radio.Button>
            </Radio.Group>
            <Text type="secondary" className="block mt-2 text-xs">
              Higher levels allow more damage but result in denser QR codes
            </Text>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Text strong>Include Margin</Text>
              <Text type="secondary" className="block text-xs">
                Add white space around the QR code
              </Text>
            </div>
            <Switch
              checked={styling.includeMargin}
              onChange={(checked) =>
                onStyleChange({ ...styling, includeMargin: checked })
              }
            />
          </div>
        </div>
      ),
    },
    {
      key: 'shape',
      label: 'Shape',
      children: (
        <div className="pt-4">
          <Text type="secondary">Shape customization coming soon...</Text>
        </div>
      ),
    },
    {
      key: 'logo',
      label: 'Logo',
      children: (
        <div className="pt-4">
            <div className="mb-6">
              <Text strong className="block mb-3">Logo Image</Text>
              <div className="flex items-center gap-3">
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  customRequest={({ file, onSuccess, onError }) => {
                    const f = file as File;
                    const maxBytes = 500 * 1024; // 500 KB
                    if (f.size > maxBytes) {
                      message.error('Logo must be less than 500 KB');
                      if (onError) onError(new Error('File too large'));
                      return;
                    }

                    const reader = new FileReader();
                    reader.onload = async () => {
                      const dataUrl = reader.result as string;
                      // immediate preview
                      onStyleChange({ ...styling, image: { ...(styling.image || {}), url: dataUrl } });

                      try {
                        const res = await uploadsAPI.uploadLogo(dataUrl);
                        if (res?.url) {
                          onStyleChange({ ...styling, image: { ...(styling.image || {}), url: res.url } });
                          message.success('Logo uploaded');
                          if (onSuccess) onSuccess(null as any, f);
                        } else {
                          throw new Error('Upload failed');
                        }
                      } catch (err: any) {
                        message.error(err.response?.data?.message || err.message || 'Upload failed');
                        if (onError) onError(err);
                      }
                    };
                    reader.readAsDataURL(f);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>

                <Input placeholder="Or paste image URL" value={styling.image?.url || ''} onChange={(e) => onStyleChange({ ...styling, image: { ...(styling.image || {}), url: e.target.value || null } })} />

                {styling.image?.url ? (
                  <div className="flex items-center gap-2">
                    <Avatar src={styling.image.url} size={40} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => onStyleChange({ ...styling, image: { url: null, size: styling.image?.size || 20, margin: styling.image?.margin || 2 } })}>Remove</Button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6">
              <Text strong className="block mb-3">Logo Size: {styling.image?.size}%</Text>
              <Slider min={5} max={50} value={styling.image?.size || 20} onChange={(v) => onStyleChange({ ...styling, image: { ...(styling.image || {}), size: v } })} />
            </div>

            <div className="mb-6">
              <Text strong className="block mb-3">Logo Margin (px)</Text>
              <Slider min={0} max={16} value={styling.image?.margin || 2} onChange={(v) => onStyleChange({ ...styling, image: { ...(styling.image || {}), margin: v } })} />
            </div>
        </div>
      ),
    },
    {
      key: 'frame',
      label: 'Frame',
      children: (
        <div className="pt-4">
          <Text type="secondary">Frame customization coming soon...</Text>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Title level={4} className="!mb-1">Customize Design</Title>
      </div>

      <Tabs items={tabItems} />
    </div>
  );
};

export default QRStyleEditor;
