import { Space, ColorPicker, Radio, Select, Typography, Slider, Switch, Upload, Button, Input, Segmented } from 'antd';
import { Upload as UploadIcon, X } from 'lucide-react';
import type { GradientColor, FrameOptions } from '../../types';

const { Text } = Typography;

interface CustomizationTabsProps {
  qrColor: string;
  setQrColor: (color: string) => void;
  qrColorGradient: GradientColor;
  setQrColorGradient: (gradient: GradientColor) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  bgColorGradient: GradientColor;
  setBgColorGradient: (gradient: GradientColor) => void;
  bgImage: string | null;
  setBgImage: (image: string | null) => void;
  bgImageOpacity: number;
  setBgImageOpacity: (opacity: number) => void;
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
  margin: number;
  setMargin: (margin: number) => void;
  frameOptions: FrameOptions;
  setFrameOptions: (frame: FrameOptions) => void;
  shadow: boolean;
  setShadow: (shadow: boolean) => void;
  shadowColor: string;
  setShadowColor: (color: string) => void;
  shadowBlur: number;
  setShadowBlur: (blur: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
}

const CustomizationTabs = (props: CustomizationTabsProps) => {
  const {
    qrColor,
    setQrColor,
    qrColorGradient,
    setQrColorGradient,
    bgColor,
    setBgColor,
    bgColorGradient,
    setBgColorGradient,
    bgImage,
    setBgImage,
    bgImageOpacity,
    setBgImageOpacity,
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
    margin,
    setMargin,
    frameOptions,
    setFrameOptions,
    shadow,
    setShadow,
    shadowColor,
    setShadowColor,
    shadowBlur,
    setShadowBlur,
    borderRadius,
    setBorderRadius,
  } = props;

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogo(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleBgImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBgImage(e.target?.result as string);
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
              QR Code Color Type
            </Text>
            <Segmented
              value={qrColorGradient.type}
              onChange={(value) => setQrColorGradient({ ...qrColorGradient, type: value as 'solid' | 'linear' | 'radial' })}
              options={[
                { label: 'Solid', value: 'solid' },
                { label: 'Linear', value: 'linear' },
                { label: 'Radial', value: 'radial' },
              ]}
              block
            />
          </div>
          
          {qrColorGradient.type === 'solid' ? (
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
          ) : (
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>
                Gradient Colors
              </Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                {qrColorGradient.gradient?.colorStops.map((stop, index) => (
                  <Space key={index} style={{ width: '100%' }}>
                    <ColorPicker
                      value={stop.color}
                      onChange={(color) => {
                        const newStops = [...(qrColorGradient.gradient?.colorStops || [])];
                        newStops[index] = { ...newStops[index], color: color.toHexString() };
                        setQrColorGradient({
                          ...qrColorGradient,
                          gradient: { ...qrColorGradient.gradient!, colorStops: newStops }
                        });
                      }}
                      size="large"
                    />
                    <Text>Stop {index + 1} ({Math.round(stop.offset * 100)}%)</Text>
                  </Space>
                ))}
                {qrColorGradient.type === 'linear' && (
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      Rotation: {qrColorGradient.gradient?.rotation || 0}°
                    </Text>
                    <Slider
                      min={0}
                      max={360}
                      value={qrColorGradient.gradient?.rotation || 0}
                      onChange={(value) => {
                        setQrColorGradient({
                          ...qrColorGradient,
                          gradient: { ...qrColorGradient.gradient!, rotation: value }
                        });
                      }}
                    />
                  </div>
                )}
              </Space>
            </div>
          )}

          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Background Type
            </Text>
            <Segmented
              value={bgColorGradient.type}
              onChange={(value) => setBgColorGradient({ ...bgColorGradient, type: value as 'solid' | 'linear' | 'radial' })}
              options={[
                { label: 'Solid', value: 'solid' },
                { label: 'Linear', value: 'linear' },
                { label: 'Radial', value: 'radial' },
              ]}
              block
            />
          </div>

          {bgColorGradient.type === 'solid' ? (
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
          ) : (
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>
                Gradient Colors
              </Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                {bgColorGradient.gradient?.colorStops.map((stop, index) => (
                  <Space key={index} style={{ width: '100%' }}>
                    <ColorPicker
                      value={stop.color}
                      onChange={(color) => {
                        const newStops = [...(bgColorGradient.gradient?.colorStops || [])];
                        newStops[index] = { ...newStops[index], color: color.toHexString() };
                        setBgColorGradient({
                          ...bgColorGradient,
                          gradient: { ...bgColorGradient.gradient!, colorStops: newStops }
                        });
                      }}
                      size="large"
                    />
                    <Text>Stop {index + 1}</Text>
                  </Space>
                ))}
                {bgColorGradient.type === 'linear' && (
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      Rotation: {bgColorGradient.gradient?.rotation || 0}°
                    </Text>
                    <Slider
                      min={0}
                      max={360}
                      value={bgColorGradient.gradient?.rotation || 0}
                      onChange={(value) => {
                        setBgColorGradient({
                          ...bgColorGradient,
                          gradient: { ...bgColorGradient.gradient!, rotation: value }
                        });
                      }}
                    />
                  </div>
                )}
              </Space>
            </div>
          )}
        </Space>
      ),
    },
    {
      key: 'background',
      label: 'Background',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Background Image
            </Text>
            {bgImage ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={bgImage}
                  alt="Background"
                  style={{
                    width: '100%',
                    maxHeight: 150,
                    objectFit: 'cover',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                  }}
                />
                <Button
                  danger
                  size="small"
                  icon={<X size={14} />}
                  onClick={() => setBgImage(null)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    borderRadius: '50%',
                  }}
                />
              </div>
            ) : (
              <Upload
                accept="image/*"
                beforeUpload={handleBgImageUpload}
                showUploadList={false}
                maxCount={1}
              >
                <Button icon={<UploadIcon size={16} />} size="large" block>
                  Upload Background Image
                </Button>
              </Upload>
            )}
          </div>
          {bgImage && (
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>
                Image Opacity: {Math.round(bgImageOpacity * 100)}%
              </Text>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={bgImageOpacity}
                onChange={setBgImageOpacity}
              />
            </div>
          )}
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
              <Radio.Button value="classy">Classy</Radio.Button>
              <Radio.Button value="classy-rounded">Classy Rounded</Radio.Button>
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
      key: 'frame',
      label: 'Frame',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Frame Style
            </Text>
            <Select
              size="large"
              value={frameOptions.style}
              onChange={(value) => setFrameOptions({ ...frameOptions, style: value, enabled: value !== 'none' })}
              style={{ width: '100%' }}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Basic Border', value: 'basic' },
                { label: 'Rounded Border', value: 'rounded' },
                { label: 'Banner with Text', value: 'banner' },
              ]}
            />
          </div>
          {frameOptions.enabled && frameOptions.style !== 'none' && (
            <>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                  Frame Color
                </Text>
                <ColorPicker
                  value={frameOptions.color}
                  onChange={(color) => setFrameOptions({ ...frameOptions, color: color.toHexString() })}
                  showText
                  size="large"
                />
              </div>
              {frameOptions.style === 'banner' && (
                <>
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      Banner Text
                    </Text>
                    <Input
                      size="large"
                      placeholder="Scan Me!"
                      value={frameOptions.text}
                      onChange={(e) => setFrameOptions({ ...frameOptions, text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>
                      Text Color
                    </Text>
                    <ColorPicker
                      value={frameOptions.textColor || '#ffffff'}
                      onChange={(color) => setFrameOptions({ ...frameOptions, textColor: color.toHexString() })}
                      showText
                      size="large"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Space>
      ),
    },
    {
      key: 'effects',
      label: 'Effects',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong>Enable Shadow</Text>
            <Switch checked={shadow} onChange={setShadow} />
          </div>
          {shadow && (
            <>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                  Shadow Color
                </Text>
                <ColorPicker
                  value={shadowColor}
                  onChange={(color) => setShadowColor(color.toHexString())}
                  showText
                  size="large"
                />
              </div>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                  Shadow Blur: {shadowBlur}px
                </Text>
                <Slider
                  min={0}
                  max={50}
                  value={shadowBlur}
                  onChange={setShadowBlur}
                />
              </div>
            </>
          )}
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Border Radius: {borderRadius}px
            </Text>
            <Slider
              min={0}
              max={50}
              value={borderRadius}
              onChange={setBorderRadius}
            />
          </div>
        </Space>
      ),
    },
    {
      key: 'spacing',
      label: 'Spacing',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>
              Margin / Quiet Zone: {margin}px
            </Text>
            <Slider
              min={0}
              max={50}
              value={margin}
              onChange={setMargin}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
              White space around the QR code for better scanning
            </Text>
          </div>
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
