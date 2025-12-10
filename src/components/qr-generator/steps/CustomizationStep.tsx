import { Typography, Tabs } from 'antd';
import CustomizationTabs from '../CustomizationTabsNew';
import type { GradientColor, FrameOptions } from '../../../types';

const { Title } = Typography;

interface CustomizationStepProps {
  qrColor: string;
  setQrColor: (value: string) => void;
  qrColorGradient: GradientColor;
  setQrColorGradient: (value: GradientColor) => void;
  bgColor: string;
  setBgColor: (value: string) => void;
  bgColorGradient: GradientColor;
  setBgColorGradient: (value: GradientColor) => void;
  bgImage: string | null;
  setBgImage: (value: string | null) => void;
  bgImageOpacity: number;
  setBgImageOpacity: (value: number) => void;
  qrSize: number;
  setQrSize: (value: number) => void;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  setErrorLevel: (value: 'L' | 'M' | 'Q' | 'H') => void;
  dotStyle: string;
  setDotStyle: (value: string) => void;
  cornerSquareStyle: string;
  setCornerSquareStyle: (value: string) => void;
  cornerDotStyle: string;
  setCornerDotStyle: (value: string) => void;
  logo: string | null;
  setLogo: (value: string | null) => void;
  logoSize: number;
  setLogoSize: (value: number) => void;
  logoPadding: number;
  setLogoPadding: (value: number) => void;
  removeBackground: boolean;
  setRemoveBackground: (value: boolean) => void;
  margin: number;
  setMargin: (value: number) => void;
  frameOptions: FrameOptions;
  setFrameOptions: (value: FrameOptions) => void;
  shadow: boolean;
  setShadow: (value: boolean) => void;
  shadowColor: string;
  setShadowColor: (value: string) => void;
  shadowBlur: number;
  setShadowBlur: (value: number) => void;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
}

const CustomizationStep = (props: CustomizationStepProps) => {
  const customizationTabs = CustomizationTabs(props);

  return (
    <div>
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        Customize Design
      </Title>
      <Tabs items={customizationTabs} />
    </div>
  );
};

export default CustomizationStep;
