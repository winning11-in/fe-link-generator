import { useRef, useEffect } from "react";
import { Card, Typography} from "antd";
import QRCodeStyling from "qr-code-styling";
import type { GradientColor, FrameOptions } from "../../types";

const { Title } = Typography;

interface QRPreviewProps {
  qrData: string;
  qrColor: string;
  qrColorGradient: GradientColor;
  bgColor: string;
  bgColorGradient: GradientColor;
  bgImage: string | null;
  bgImageOpacity: number;
  qrSize: number;
  errorLevel: "L" | "M" | "Q" | "H";
  dotStyle: string;
  cornerSquareStyle: string;
  cornerDotStyle: string;
  logo: string | null;
  logoSize: number;
  logoPadding: number;
  removeBackground: boolean;
  margin: number;
  frameOptions: FrameOptions;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  borderRadius: number;
  title: string;
  loading: boolean;
  onSave: () => void;
  saveButtonText?: string;
  downloadFormat?: 'png' | 'svg' | 'jpeg';
}

const QRPreviewNew = ({
  qrData,
  qrColor,
  qrColorGradient,
  bgColor,
  bgColorGradient,
  bgImage,
  bgImageOpacity,
  qrSize,
  errorLevel,
  dotStyle,
  cornerSquareStyle,
  cornerDotStyle,
  logo,
  logoSize,
  logoPadding,
  removeBackground,
  margin,
  frameOptions,
  shadow,
  shadowColor,
  shadowBlur,
  borderRadius,
  
 }: QRPreviewProps) => {
  const qrCodeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

 

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Map error correction level
    const errorCorrectionMap = {
      L: "L" as const,
      M: "M" as const,
      Q: "Q" as const,
      H: "H" as const,
    };

    // Prepare dots options with gradient support
    const dotsOptions: any = {
      type: dotStyle as any,
    };

    if (qrColorGradient.type === "solid") {
      dotsOptions.color = qrColor;
    } else if (qrColorGradient.type === "linear" && qrColorGradient.gradient) {
      dotsOptions.gradient = {
        type: "linear",
        rotation: (qrColorGradient.gradient.rotation || 0) * (Math.PI / 180),
        colorStops: qrColorGradient.gradient.colorStops,
      };
    } else if (qrColorGradient.type === "radial" && qrColorGradient.gradient) {
      dotsOptions.gradient = {
        type: "radial",
        colorStops: qrColorGradient.gradient.colorStops,
      };
    }

    // Prepare background options
    const backgroundOptions: any = {};

    if (bgImage) {
      backgroundOptions.color = "transparent";
    } else if (bgColorGradient.type === "solid") {
      backgroundOptions.color = bgColor;
    } else if (bgColorGradient.type === "linear" && bgColorGradient.gradient) {
      backgroundOptions.gradient = {
        type: "linear",
        rotation: (bgColorGradient.gradient.rotation || 0) * (Math.PI / 180),
        colorStops: bgColorGradient.gradient.colorStops,
      };
    } else if (bgColorGradient.type === "radial" && bgColorGradient.gradient) {
      backgroundOptions.gradient = {
        type: "radial",
        colorStops: bgColorGradient.gradient.colorStops,
      };
    }

    const qrCode = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      data: qrData || "https://example.com",
      margin: margin,
      dotsOptions,
      backgroundOptions,
      cornersSquareOptions: {
        color:
          qrColorGradient.type === "solid"
            ? qrColor
            : qrColorGradient.gradient?.colorStops[0].color || qrColor,
        type: cornerSquareStyle as any,
      },
      cornersDotOptions: {
        color:
          qrColorGradient.type === "solid"
            ? qrColor
            : qrColorGradient.gradient?.colorStops[0].color || qrColor,
        type: cornerDotStyle as any,
      },
      ...(logo && {
        imageOptions: {
          hideBackgroundDots: removeBackground,
          imageSize: logoSize / 280,
          margin: logoPadding,
        },
        image: logo,
      }),
      qrOptions: {
        errorCorrectionLevel: errorCorrectionMap[errorLevel],
      },
    });

    container.innerHTML = "";
    qrCode.append(container);
    qrCodeRef.current = qrCode;

    // Apply background image if set
    if (bgImage && containerRef.current) {
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            ctx.globalAlpha = bgImageOpacity;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
          };
          img.src = bgImage;
        }
      }
    }

    // Apply effects (shadow, border radius)
    const canvas = container.querySelector("canvas");
    if (canvas) {
      canvasRef.current = canvas;
      if (shadow) {
        canvas.style.boxShadow = `0 0 ${shadowBlur}px ${shadowColor}`;
      } else {
        canvas.style.boxShadow = "none";
      }
      canvas.style.borderRadius = `${borderRadius}px`;
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [
    qrData,
    qrColor,
    qrColorGradient,
    bgColor,
    bgColorGradient,
    bgImage,
    bgImageOpacity,
    qrSize,
    dotStyle,
    cornerSquareStyle,
    cornerDotStyle,
    logo,
    logoSize,
    logoPadding,
    removeBackground,
    errorLevel,
    margin,
    shadow,
    shadowColor,
    shadowBlur,
    borderRadius,
  ]);

 

  return (
    <Card
      style={{
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        position: "sticky",
        top: 24,
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        Preview
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
          background: "#f9fafb",
          borderRadius: 12,
          marginBottom: 24,
          minHeight: 344,
          position: "relative",
        }}
      >
        {/* Frame rendering */}
        {frameOptions.enabled && frameOptions.style !== "none" && (
          <div
            style={{
              position: "absolute",
              inset: 32,
              border:
                frameOptions.style === "basic"
                  ? `4px solid ${frameOptions.color}`
                  : "none",
              borderRadius: frameOptions.style === "rounded" ? "16px" : "0",
              pointerEvents: "none",
            }}
          >
            {frameOptions.style === "rounded" && (
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  border: `4px solid ${frameOptions.color}`,
                  borderRadius: "16px",
                }}
              />
            )}
            {frameOptions.style === "banner" && frameOptions.text && (
              <div
                style={{
                  position: "absolute",
                  bottom: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: frameOptions.color,
                  color: frameOptions.textColor || "#ffffff",
                  padding: "8px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {frameOptions.text}
              </div>
            )}
          </div>
        )}
        <div ref={containerRef} />
      </div>
    </Card>
  );
};

export default QRPreviewNew;
