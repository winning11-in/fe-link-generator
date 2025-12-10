import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, message } from "antd";
import { Mail, Lock, QrCode, Zap, BarChart3, Shield } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
// import { GoogleIcon, FacebookIcon, AppleIcon } from "../components/auth/Icons";
import {
  AuthContainer,
  BrandingColumn,
  DecorativeCircle,
  BrandingContent,
  BrandHeader,
  BrandTitle,
  BrandHeadline,
  BrandDescription,
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  FeatureContent,
  FeatureTitle,
  FeatureDescription,
  FormColumn,
  FormCard,
  IconContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ForgotPasswordLink,
  SubmitButton,
  // Divider,
  // DividerLine,
  // DividerText,
  // SocialButtonsContainer,
  // SocialButton,
  FooterText,
  FooterLink,
} from "../components/auth/AuthStyles";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  const onFinish = async (values: SignInFormData) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  const features = [
    {
      icon: Zap,
      title: "Instant Generation",
      desc: "Create QR codes in seconds",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      desc: "Track scans and user behavior",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Enterprise-grade security",
    },
  ];

  return (
    <AuthContainer>
      {/* Left Column - Branding */}
      <BrandingColumn>
        <DecorativeCircle size="400px" top="-100px" right="-100px" />
        <DecorativeCircle size="300px" bottom="-80px" left="-80px" />

        <BrandingContent>
          <BrandHeader>
            <QrCode size={48} color="#fff" strokeWidth={2} />
            <BrandTitle>QR Generator</BrandTitle>
          </BrandHeader>

          <BrandHeadline>
            Create, Track & Manage Your QR Codes with Ease
          </BrandHeadline>

          <BrandDescription>
            Professional QR code generation platform with powerful analytics and
            customization options.
          </BrandDescription>

          <FeaturesList>
            {features.map((feature, idx) => (
              <FeatureItem key={idx}>
                <FeatureIcon>
                  <feature.icon size={24} color="#fff" strokeWidth={2} />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.desc}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeaturesList>
        </BrandingContent>
      </BrandingColumn>

      {/* Right Column - Form */}
      <FormColumn>
        <FormCard>
          <IconContainer>
            <Mail size={28} color="#1e293b" strokeWidth={2} />
          </IconContainer>

          <FormHeader>
            <FormTitle>Sign in with email</FormTitle>
            <FormSubtitle>
              Make a new doc to bring your words, data,
              <br />
              and teams together. For free
            </FormSubtitle>
          </FormHeader>

          <Form
            name="signin"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item name="email">
              <Input
                prefix={<Mail size={16} style={{ color: "#94a3b8" }} />}
                placeholder="Email"
                size="large"
                style={{
                  borderRadius: "10px",
                  height: "48px",
                  fontSize: "14px",
                  background: "#f8f9fa",
                  border: "1px solid #e2e8f0",
                }}
              />
            </Form.Item>

            <Form.Item name="password" style={{ marginBottom: "12px" }}>
              <Input.Password
                prefix={<Lock size={16} style={{ color: "#94a3b8" }} />}
                placeholder="Password"
                size="large"
                style={{
                  borderRadius: "10px",
                  height: "48px",
                  fontSize: "14px",
                  background: "#f8f9fa",
                  border: "1px solid #e2e8f0",
                }}
              />
            </Form.Item>

            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
            </div>

            <Form.Item style={{ marginBottom: "20px" }}>
              <SubmitButton type="submit" loading={loading}>
                Get Started
              </SubmitButton>
            </Form.Item>

            {/* <Divider>
              <DividerLine />
              <DividerText>Or sign in with</DividerText>
            </Divider> */}

            {/* <SocialButtonsContainer>
              <SocialButton type="button">
                <GoogleIcon />
              </SocialButton>
              <SocialButton type="button">
                <FacebookIcon />
              </SocialButton>
              <SocialButton type="button">
                <AppleIcon />
              </SocialButton>
            </SocialButtonsContainer> */}

            <FooterText>
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <FooterLink>Sign Up</FooterLink>
              </Link>
            </FooterText>
          </Form>
        </FormCard>
      </FormColumn>
    </AuthContainer>
  );
};

export default SignIn;
