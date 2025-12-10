import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import QRCodeStyling from 'qr-code-styling';
import { qrCodeAPI } from '../services/api';
import { templates } from '../components/qr-generator/templates';
import { parseQRData } from '../utils/qrDataGenerator';
import type { QRTemplate } from '../components/qr-generator/templates';

interface UseQRManagerOptions {
  id?: string;
  contentState: any;
  designState: any;
  selectedTemplate: QRTemplate;
  setSelectedTemplate: (template: QRTemplate) => void;
  generateQRDataFn: () => string;
}

export const useQRManager = ({
  id,
  contentState,
  designState,
  selectedTemplate,
  setSelectedTemplate,
  generateQRDataFn,
}: UseQRManagerOptions) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingQR, setFetchingQR] = useState(false);
  const isEditMode = !!id;

  // Load existing QR code data when editing
  useEffect(() => {
    const loadQRCode = async () => {
      if (!id) return;

      try {
        setFetchingQR(true);
        const response = await qrCodeAPI.getOne(id);
        const qr = response.qrCode;

        if (!qr) {
          throw new Error('QR code data not found in response');
        }

        // Set basic fields
        contentState.setTitle(qr.title);
        contentState.setQrData(qr.data);

        // Set customization if available
        if (qr.customization) {
          const c = qr.customization;
          if (c.qrColor) designState.setQrColor(c.qrColor);
          if (c.qrColorGradient) designState.setQrColorGradient(c.qrColorGradient);
          if (c.bgColor) designState.setBgColor(c.bgColor);
          if (c.bgColorGradient) designState.setBgColorGradient(c.bgColorGradient);
          if (c.bgImage) designState.setBgImage(c.bgImage);
          if (c.bgImageOpacity !== undefined) designState.setBgImageOpacity(c.bgImageOpacity);
          if (c.qrSize) designState.setQrSize(c.qrSize);
          if (c.errorLevel) designState.setErrorLevel(c.errorLevel);
          if (c.dotStyle) designState.setDotStyle(c.dotStyle);
          if (c.cornerSquareStyle) designState.setCornerSquareStyle(c.cornerSquareStyle);
          if (c.cornerDotStyle) designState.setCornerDotStyle(c.cornerDotStyle);
          if (c.logo) designState.setLogo(c.logo);
          if (c.logoSize) designState.setLogoSize(c.logoSize);
          if (c.logoPadding) designState.setLogoPadding(c.logoPadding);
          if (c.removeBackground !== undefined) designState.setRemoveBackground(c.removeBackground);
          if (c.margin !== undefined) designState.setMargin(c.margin);
          if (c.frameOptions) designState.setFrameOptions(c.frameOptions);
          if (c.shadow !== undefined) designState.setShadow(c.shadow);
          if (c.shadowColor) designState.setShadowColor(c.shadowColor);
          if (c.shadowBlur !== undefined) designState.setShadowBlur(c.shadowBlur);
          if (c.borderRadius !== undefined) designState.setBorderRadius(c.borderRadius);
        }

        // Set template and type-specific fields
        const template = templates.find(t => t.type === qr.type) || templates[0];
        setSelectedTemplate(template);

        // Parse data based on type
        const parsedData = parseQRData(qr.data, qr.type);
        Object.entries(parsedData).forEach(([key, value]) => {
          const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
          if (contentState[setterName]) {
            contentState[setterName](value);
          }
        });

        message.success('QR Code loaded for editing');
      } catch (err: any) {
        message.error(err.response?.data?.message || err.message || 'Failed to load QR code');
        navigate('/dashboard');
      } finally {
        setFetchingQR(false);
      }
    };

    loadQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const generatePreviewImage = async (data: string, customization: any): Promise<string> => {
    return new Promise((resolve) => {
      const errorCorrectionMap: Record<string, "L" | "M" | "Q" | "H"> = {
        L: "L", M: "M", Q: "Q", H: "H",
      };

      const dotsOptions: any = { type: customization.dotStyle || "square" };
      const qrColorGradient = customization.qrColorGradient;
      
      if (qrColorGradient?.type === "solid") {
        dotsOptions.color = customization.qrColor || "#000000";
      } else if (qrColorGradient?.type === "linear" && qrColorGradient.gradient) {
        dotsOptions.gradient = {
          type: "linear",
          rotation: (qrColorGradient.gradient.rotation || 0) * (Math.PI / 180),
          colorStops: qrColorGradient.gradient.colorStops,
        };
      } else if (qrColorGradient?.type === "radial" && qrColorGradient.gradient) {
        dotsOptions.gradient = {
          type: "radial",
          colorStops: qrColorGradient.gradient.colorStops,
        };
      } else {
        dotsOptions.color = customization.qrColor || "#000000";
      }

      const backgroundOptions: any = {};
      const bgColorGradient = customization.bgColorGradient;

      if (customization.bgImage) {
        backgroundOptions.color = "transparent";
      } else if (bgColorGradient?.type === "solid") {
        backgroundOptions.color = customization.bgColor || "#ffffff";
      } else if (bgColorGradient?.type === "linear" && bgColorGradient.gradient) {
        backgroundOptions.gradient = {
          type: "linear",
          rotation: (bgColorGradient.gradient.rotation || 0) * (Math.PI / 180),
          colorStops: bgColorGradient.gradient.colorStops,
        };
      } else if (bgColorGradient?.type === "radial" && bgColorGradient.gradient) {
        backgroundOptions.gradient = {
          type: "radial",
          colorStops: bgColorGradient.gradient.colorStops,
        };
      } else {
        backgroundOptions.color = customization.bgColor || "#ffffff";
      }

      const cornerColor = qrColorGradient?.type === "solid"
        ? customization.qrColor || "#000000"
        : qrColorGradient?.gradient?.colorStops?.[0]?.color || customization.qrColor || "#000000";

      const qrConfig: any = {
        width: 300,
        height: 300,
        data: data,
        margin: customization.margin ?? 10,
        dotsOptions,
        backgroundOptions,
        cornersSquareOptions: {
          color: cornerColor,
          type: customization.cornerSquareStyle || "square",
        },
        cornersDotOptions: {
          color: cornerColor,
          type: customization.cornerDotStyle || "square",
        },
        qrOptions: {
          errorCorrectionLevel: errorCorrectionMap[customization.errorLevel || "M"],
        },
      };

      if (customization.logo) {
        qrConfig.imageOptions = {
          hideBackgroundDots: customization.removeBackground ?? true,
          imageSize: (customization.logoSize || 50) / 280,
          margin: customization.logoPadding || 5,
        };
        qrConfig.image = customization.logo;
      }

      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      const qrCode = new QRCodeStyling(qrConfig);
      qrCode.append(tempContainer);

      setTimeout(() => {
        const canvas = tempContainer.querySelector('canvas');
        if (canvas) {
          // Apply background image if exists
          if (customization.bgImage) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const img = new Image();
              img.onload = () => {
                ctx.globalCompositeOperation = "destination-over";
                ctx.globalAlpha = customization.bgImageOpacity ?? 1;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "source-over";
                ctx.globalAlpha = 1;
                
                const previewDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                document.body.removeChild(tempContainer);
                resolve(previewDataUrl);
              };
              img.crossOrigin = "anonymous";
              img.src = customization.bgImage;
            }
          } else {
            const previewDataUrl = canvas.toDataURL('image/jpeg', 0.6);
            document.body.removeChild(tempContainer);
            resolve(previewDataUrl);
          }
        } else {
          document.body.removeChild(tempContainer);
          resolve('');
        }
      }, 200);
    });
  };

  const handleSaveQR = async () => {
    try {
      setLoading(true);
      const data = generateQRDataFn();
      
      if (!contentState.title || !data) {
        message.error('Please fill in all required fields');
        return;
      }

      const qrType = ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'location', 'upi', 'vcard', 'instagram', 'facebook', 'youtube', 'whatsapp'].includes(selectedTemplate.type) 
        ? selectedTemplate.type as 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp'
        : 'text';

      const customization = {
        qrColor: designState.qrColor,
        qrColorGradient: designState.qrColorGradient,
        bgColor: designState.bgColor,
        bgColorGradient: designState.bgColorGradient,
        bgImage: designState.bgImage,
        bgImageOpacity: designState.bgImageOpacity,
        qrSize: designState.qrSize,
        errorLevel: designState.errorLevel,
        dotStyle: designState.dotStyle,
        cornerSquareStyle: designState.cornerSquareStyle,
        cornerDotStyle: designState.cornerDotStyle,
        logo: designState.logo,
        logoSize: designState.logoSize,
        logoPadding: designState.logoPadding,
        removeBackground: designState.removeBackground,
        margin: designState.margin,
        frameOptions: designState.frameOptions,
        shadow: designState.shadow,
        shadowColor: designState.shadowColor,
        shadowBlur: designState.shadowBlur,
        borderRadius: designState.borderRadius,
      };

      // Generate preview image
      const previewImage = await generatePreviewImage(data, customization);

      const qrPayload = {
        title: contentState.title,
        data,
        type: qrType,
        previewImage,
        customization,
      };

      if (isEditMode) {
        await qrCodeAPI.update(id!, qrPayload);
        message.success('QR Code updated successfully!');
      } else {
        await qrCodeAPI.create(qrPayload);
        message.success('QR Code created successfully!');
      }

      navigate('/dashboard');
    } catch (err: any) {
      message.error(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} QR code`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchingQR,
    isEditMode,
    handleSaveQR,
  };
};
