import { useState } from 'react';
import type { GradientColor, FrameOptions } from '../types';

export const useQRDesign = () => {
  // Basic colors
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Advanced customization
  const [dotStyle, setDotStyle] = useState('square');
  const [cornerSquareStyle, setCornerSquareStyle] = useState('square');
  const [cornerDotStyle, setCornerDotStyle] = useState('square');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoPadding, setLogoPadding] = useState(5);
  const [removeBackground, setRemoveBackground] = useState(true);

  // Gradient colors
  const [qrColorGradient, setQrColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#000000',
  });
  const [bgColorGradient, setBgColorGradient] = useState<GradientColor>({
    type: 'solid',
    color: '#ffffff',
  });

  // Background image
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgImageOpacity, setBgImageOpacity] = useState(1);

  // Spacing & Effects
  const [margin, setMargin] = useState(10);
  const [frameOptions, setFrameOptions] = useState<FrameOptions>({
    enabled: false,
    style: 'none',
    color: '#000000',
    text: '',
    textColor: '#ffffff',
  });
  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);

  const applyDesignTemplate = (settings: any) => {
    setQrColor(settings.qrColor);
    setQrColorGradient(settings.qrColorGradient);
    setBgColor(settings.bgColor);
    setBgColorGradient(settings.bgColorGradient);
    setDotStyle(settings.dotStyle);
    setCornerSquareStyle(settings.cornerSquareStyle);
    setCornerDotStyle(settings.cornerDotStyle);
    setFrameOptions(settings.frameOptions);
    setShadow(settings.shadow);
    setShadowColor(settings.shadowColor);
    setShadowBlur(settings.shadowBlur);
    setBorderRadius(settings.borderRadius);
    setMargin(settings.margin);
  };

  return {
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
    qrColorGradient,
    setQrColorGradient,
    bgColorGradient,
    setBgColorGradient,
    bgImage,
    setBgImage,
    bgImageOpacity,
    setBgImageOpacity,
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
    applyDesignTemplate,
  };
};
