import { Space, ColorPicker, Radio, Select, Typography, Slider, Switch, Upload, Button } from 'antd';
import { Upload as UploadIcon, X } from 'lucide-react';

const { Text } = Typography;

interface CustomizationTabsProps {
  qrColor: string;
  setQrColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  qrSize: number;
  setQrSize: (size: number) => void;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  setErrorLevel: (level: 'L' | 'M' | 'Q' | 'H') => void;
  dotStyle: string;
  setDotStyle: (style: string) => void;
  cornerSquareStyle: string;
  setCornerSquareStyle: (style: string) => void;
  cornerDotStyle: string;
  setCornerDotStyle: (style: string) => void;
  logo: string | null;
  setLogo: (logo: string | null) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
  logoPadding: number;
  setLogoPadding: (padding: number) => void;
  removeBackground: boolean;
  setRemoveBackground: (remove: boolean) => void;
}

const CustomizationTabs = ({
  qrColor,
  setQrColor,
  bgColor,
  setBgColor,
  qrSize,
  setQrSize,
  errorLevel,
  setErrorLevel,
  dotStyle,
  setDotStyle,
  cornerSquareStyle,
  setCornerSquareStyle,
  cornerDotStyle,
  setCornerDotStyle,
  logo,
  setLogo,
  logoSize,
  setLogoSize,
  logoPadding,
  setLogoPadding,
  removeBackground,
  setRemoveBackground,
}: CustomizationTabsProps) => {
  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogo(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return [
    {
      key: 'colors',
      label: 'Colors',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              QR Code Color
            </Text>
            <ColorPicker
              value={qrColor}
              onChange={(color) => setQrColor(color.toHexString())}
              showText
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Background Color
            </Text>
            <ColorPicker
              value={bgColor}
              onChange={(color) => setBgColor(color.toHexString())}
              showText
              size="large"
            />
          </div>
        </Space>
      ),
    },
    {
      key: 'shape',
      label: 'Shape',
      children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Dot Style
          </Text>
          <Radio.Group value={dotStyle} onChange={(e) => setDotStyle(e.target.value)} style={{ width: '100%' }}>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="dots">Dots</Radio.Button>
            <Radio.Button value="rounded">Rounded</Radio.Button>
            <Radio.Button value="extra-rounded">Extra Rounded</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Corner Square Style
          </Text>
          <Radio.Group value={cornerSquareStyle} onChange={(e) => setCornerSquareStyle(e.target.value)} style={{ width: '100%' }}>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="extra-rounded">Rounded</Radio.Button>
            <Radio.Button value="dot">Dot</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Corner Dot Style
          </Text>
          <Radio.Group value={cornerDotStyle} onChange={(e) => setCornerDotStyle(e.target.value)} style={{ width: '100%' }}>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="dot">Dot</Radio.Button>
          </Radio.Group>
        </div>
      </Space>
      ),
    },
    {
      key: 'logo',
      label: 'Logo',
      children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Upload Logo
          </Text>
          {logo ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 8,
                }}
              />
              <Button
                danger
                size="small"
                icon={<X size={14} />}
                onClick={() => setLogo(null)}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  borderRadius: '50%',
                  minWidth: 24,
                  width: 24,
                  height: 24,
                  padding: 0,
                }}
              />
            </div>
          ) : (
            <Upload
              accept="image/*"
              beforeUpload={handleLogoUpload}
              showUploadList={false}
              maxCount={1}
            >
              <Button icon={<UploadIcon size={16} />} size="large" block>
                Upload Logo Image
              </Button>
            </Upload>
          )}
        </div>
        {logo && (
          <>
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>
                Logo Size: {logoSize}px
              </Text>
              <Slider
                min={20}
                max={100}
                value={logoSize}
                onChange={setLogoSize}
              />
            </div>
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>
                Logo Padding: {logoPadding}px
              </Text>
              <Slider
                min={0}
                max={20}
                value={logoPadding}
                onChange={setLogoPadding}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Remove Background</Text>
              <Switch checked={removeBackground} onChange={setRemoveBackground} />
            </div>
          </>
        )}
      </Space>
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Size
          </Text>
          <Radio.Group value={qrSize} onChange={(e) => setQrSize(e.target.value)}>
            <Radio.Button value={128}>Small</Radio.Button>
            <Radio.Button value={256}>Medium</Radio.Button>
            <Radio.Button value={512}>Large</Radio.Button>
            <Radio.Button value={1024}>XL</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            Error Correction Level
          </Text>
          <Select
            size="large"
            value={errorLevel}
            onChange={setErrorLevel}
            style={{ width: '100%' }}
            options={[
              { label: 'Low (7%)', value: 'L' },
              { label: 'Medium (15%)', value: 'M' },
              { label: 'Quartile (25%)', value: 'Q' },
              { label: 'High (30%)', value: 'H' },
            ]}
          />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            Higher levels allow QR code to work even if partially damaged
          </Text>
        </div>
      </Space>
      ),
    },
  ];
};

export default CustomizationTabs;
