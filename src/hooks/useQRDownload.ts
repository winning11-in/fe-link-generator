import { message } from 'antd';
import QRCodeStyling from 'qr-code-styling';
import type { QRCode } from '../types';

interface UseQRDownloadProps {
  qr: QRCode;
  scanUrl: string;
}

export const useQRDownload = ({ qr, scanUrl }: UseQRDownloadProps) => {
  const handleDownload = async () => {
    const customization = qr.customization;
    
    // Create a high-quality version for download (minimum 2048px for print quality)
    const downloadSize = Math.max(customization?.qrSize || 2048, 2048);
    const errorCorrectionMap: Record<string, "L" | "M" | "Q" | "H"> = {
      L: "L",
      M: "M",
      Q: "Q",
      H: "H",
    };

    // Prepare dots options with gradient support
    const dotsOptions: any = {
      type: customization?.dotStyle || "square",
    };

    const qrColorGradient = customization?.qrColorGradient;
    if (qrColorGradient?.type === "solid") {
      dotsOptions.color = customization?.qrColor || "#000000";
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
      dotsOptions.color = customization?.qrColor || "#000000";
    }

    // Prepare background options
    const backgroundOptions: any = {};
    const bgColorGradient = customization?.bgColorGradient;
    
    if (customization?.bgImage) {
      backgroundOptions.color = "transparent";
    } else if (bgColorGradient?.type === "solid") {
      backgroundOptions.color = customization?.bgColor || "#ffffff";
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
      backgroundOptions.color = customization?.bgColor || "#ffffff";
    }

    const cornerColor = qrColorGradient?.type === "solid" 
      ? customization?.qrColor || "#000000"
      : qrColorGradient?.gradient?.colorStops?.[0]?.color || customization?.qrColor || "#000000";

    const downloadConfig: any = {
      width: downloadSize,
      height: downloadSize,
      data: scanUrl,
      margin: customization?.margin !== undefined ? customization.margin : 10,
      dotsOptions,
      backgroundOptions,
      cornersSquareOptions: {
        color: cornerColor,
        type: customization?.cornerSquareStyle || "square",
      },
      cornersDotOptions: {
        color: cornerColor,
        type: customization?.cornerDotStyle || "square",
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrectionMap[customization?.errorLevel || "H"],
      },
    };

    // Add logo if exists - calculate size relative to download size
    if (customization?.logo) {
      const logoSizePercent = (customization.logoSize || 50) / 100;
      downloadConfig.imageOptions = {
        hideBackgroundDots: customization.removeBackground ?? true,
        imageSize: logoSizePercent * 0.5,
        margin: customization.logoPadding || 5,
      };
      downloadConfig.image = customization.logo;
    }

    // Create QR code with effects
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    const qrCodeForDownload = new QRCodeStyling(downloadConfig);
    qrCodeForDownload.append(tempContainer);

    // Wait for QR code to render
    await new Promise(resolve => setTimeout(resolve, 100));

    const qrCanvas = tempContainer.querySelector('canvas');
    if (!qrCanvas) {
      document.body.removeChild(tempContainer);
      message.error("Failed to generate QR code");
      return;
    }

    // Create final canvas with effects (shadow, border radius, frame)
    const shadow = customization?.shadow ?? false;
    const shadowBlur = customization?.shadowBlur || 0;
    const shadowColor = customization?.shadowColor || "#000000";
    const borderRadius = customization?.borderRadius || 0;
    const frameOptions = customization?.frameOptions;

    // Calculate final canvas size with padding for shadow and frame
    const padding = Math.max(shadowBlur * 2, 50);
    const framePadding = frameOptions?.enabled ? 100 : 0;
    const finalWidth = downloadSize + padding * 2 + framePadding * 2;
    const finalHeight = downloadSize + padding * 2 + framePadding * 2 + (frameOptions?.enabled && frameOptions?.style === 'banner' && frameOptions?.text ? 100 : 0);

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = finalWidth;
    finalCanvas.height = finalHeight;
    const ctx = finalCanvas.getContext('2d');

    if (!ctx) {
      document.body.removeChild(tempContainer);
      message.error("Failed to create canvas");
      return;
    }

    // Fill background with transparency or white
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, finalWidth, finalHeight);

    // Apply shadow
    if (shadow && shadowBlur > 0) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur * 2;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Draw rounded rectangle for QR code
    const qrX = padding + framePadding;
    const qrY = padding + framePadding;

    ctx.save();
    
    // Create rounded rectangle path
    if (borderRadius > 0) {
      const radius = Math.min(borderRadius * 2, downloadSize / 2);
      ctx.beginPath();
      ctx.moveTo(qrX + radius, qrY);
      ctx.lineTo(qrX + downloadSize - radius, qrY);
      ctx.quadraticCurveTo(qrX + downloadSize, qrY, qrX + downloadSize, qrY + radius);
      ctx.lineTo(qrX + downloadSize, qrY + downloadSize - radius);
      ctx.quadraticCurveTo(qrX + downloadSize, qrY + downloadSize, qrX + downloadSize - radius, qrY + downloadSize);
      ctx.lineTo(qrX + radius, qrY + downloadSize);
      ctx.quadraticCurveTo(qrX, qrY + downloadSize, qrX, qrY + downloadSize - radius);
      ctx.lineTo(qrX, qrY + radius);
      ctx.quadraticCurveTo(qrX, qrY, qrX + radius, qrY);
      ctx.closePath();
      ctx.clip();
    }

    // Draw QR code
    ctx.drawImage(qrCanvas, qrX, qrY, downloadSize, downloadSize);
    
    ctx.restore();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Draw frame if enabled
    if (frameOptions?.enabled && frameOptions.style !== 'none') {
      const frameColor = frameOptions.color || '#000000';
      const frameWidth = 8;

      ctx.strokeStyle = frameColor;
      ctx.lineWidth = frameWidth;

      if (frameOptions.style === 'basic') {
        ctx.strokeRect(qrX - frameWidth / 2, qrY - frameWidth / 2, downloadSize + frameWidth, downloadSize + frameWidth);
      } else if (frameOptions.style === 'rounded') {
        const radius = 32;
        ctx.beginPath();
        ctx.moveTo(qrX + radius, qrY - frameWidth / 2);
        ctx.lineTo(qrX + downloadSize - radius, qrY - frameWidth / 2);
        ctx.quadraticCurveTo(qrX + downloadSize + frameWidth / 2, qrY - frameWidth / 2, qrX + downloadSize + frameWidth / 2, qrY + radius);
        ctx.lineTo(qrX + downloadSize + frameWidth / 2, qrY + downloadSize - radius);
        ctx.quadraticCurveTo(qrX + downloadSize + frameWidth / 2, qrY + downloadSize + frameWidth / 2, qrX + downloadSize - radius, qrY + downloadSize + frameWidth / 2);
        ctx.lineTo(qrX + radius, qrY + downloadSize + frameWidth / 2);
        ctx.quadraticCurveTo(qrX - frameWidth / 2, qrY + downloadSize + frameWidth / 2, qrX - frameWidth / 2, qrY + downloadSize - radius);
        ctx.lineTo(qrX - frameWidth / 2, qrY + radius);
        ctx.quadraticCurveTo(qrX - frameWidth / 2, qrY - frameWidth / 2, qrX + radius, qrY - frameWidth / 2);
        ctx.stroke();
      } else if (frameOptions.style === 'banner' && frameOptions.text) {
        // Draw banner below QR code
        const bannerY = qrY + downloadSize + 40;
        const bannerHeight = 60;
        const bannerWidth = downloadSize * 0.8;
        const bannerX = qrX + (downloadSize - bannerWidth) / 2;

        ctx.fillStyle = frameColor;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 16);
        ctx.fill();

        // Draw text
        ctx.fillStyle = frameOptions.textColor || '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frameOptions.text, qrX + downloadSize / 2, bannerY + bannerHeight / 2);
      }
    }

    // Convert to blob and download
    finalCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = qr.title.replace(/\s+/g, "-") + "-qr.png";
        link.click();
        URL.revokeObjectURL(url);
        message.success("QR Code downloaded in high quality!");
      }
      document.body.removeChild(tempContainer);
    }, 'image/png', 1.0);
  };

  return { handleDownload };
};
