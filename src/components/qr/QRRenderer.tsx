import React, { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling from 'qr-code-styling';
import type { QRStyling } from '../../types/qrCode';

interface QRRendererProps {
  content: string;
  styling: QRStyling;
  size?: number;
  compact?: boolean;
  className?: string;
}

const QRRenderer: React.FC<QRRendererProps> = ({ content, styling, size = 160, compact = false, className }) => {
  const qrContainerRef = useRef<HTMLDivElement | null>(null);
  const qrInstanceRef = useRef<any>(null);
  const [styledReady, setStyledReady] = useState(false);

  useEffect(() => {
    if (compact) return;

    const opts: any = {
      width: size,
      height: size,
      data: content || 'https://example.com',
      dotsOptions: {
        color: styling.fgColor || '#000',
        type: (styling.dotStyle as any) || 'square',
      },
      cornersSquareOptions: {
        color: styling.fgColor || '#000',
        type: styling.cornerStyle === 'extra-rounded' ? 'extra-rounded' : (styling.cornerStyle === 'dot' ? 'dot' : 'square'),
      },
      cornersDotOptions: {
        color: styling.fgColor || '#000',
        type: styling.cornerStyle === 'dot' ? 'dot' : 'square',
      },
      backgroundOptions: {
        color: styling.bgColor || '#fff',
      },
      image: styling.image?.url || undefined,
      imageOptions: styling.image?.url ? {
        hideBackgroundDots: true,
        imageSize: (styling.image?.size || 20) / 100,
        margin: styling.image?.margin || 2,
      } : undefined,
      qrOptions: {
        errorCorrectionLevel: styling.level || 'M',
      },
    };

    try {
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
        qrInstanceRef.current = new (QRCodeStyling as any)(opts);
        qrInstanceRef.current.append(qrContainerRef.current);
        setStyledReady(true);
      }
    } catch (e) {
      console.warn('QRRenderer: qr-code-styling init failed', e);
      qrInstanceRef.current = null;
      setStyledReady(false);
    }

    return () => {
      // cleanup container, instance kept for garbage collection
    };
  }, [content, styling, size, compact]);

  const qrSize = compact ? 48 : size;

  return (
    <div className={className} style={{ width: qrSize, height: qrSize, position: 'relative' }}>
      {/* Immediate fallback */}
      <div style={{ width: qrSize, height: qrSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeSVG value={content || 'https://example.com'} size={qrSize} fgColor={styling.fgColor} bgColor={styling.bgColor} level={styling.level || 'M'} includeMargin={styling.includeMargin} />
        {styling.image?.url && (
          <img src={styling.image.url} alt="logo" style={{ position: 'absolute', width: `${(styling.image.size || 20) / 100 * qrSize}px`, height: 'auto', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', borderRadius: 8 }} />
        )}
      </div>

      {/* Overlay styled output when ready */}
      <div ref={qrContainerRef} style={{ position: 'absolute', left: 0, top: 0, display: styledReady ? 'block' : 'none', width: qrSize, height: qrSize, pointerEvents: 'none' }} />
    </div>
  );
};

export default QRRenderer;
