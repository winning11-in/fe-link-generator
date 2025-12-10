import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, message } from "antd";
import {
  Mail,
  Lock,
  User,
  QrCode,
  Palette,
  LineChart,
  Globe,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
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
  SubmitButton,
  FooterText,
  FooterLink,
} from "../components/auth/AuthStyles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signup, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  const onFinish = async (values: SignUpFormData) => {
    setLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  const features = [
    {
      icon: Palette,
      title: "Custom Designs",
      desc: "Personalize with colors and logos",
    },
    {
      icon: LineChart,
      title: "Detailed Analytics",
      desc: "Monitor performance in real-time",
    },
    { icon: Globe, title: "Global Reach", desc: "Works anywhere, anytime" },
  ];

  return (
    <AuthContainer>
      <BrandingColumn>
        <DecorativeCircle size="400px" top="-100px" right="-100px" />
        <DecorativeCircle size="300px" bottom="-80px" left="-80px" />

        <BrandingContent>
          <BrandHeader>
            <QrCode size={48} color="#fff" strokeWidth={2} />
            <BrandTitle>QR Generator</BrandTitle>
          </BrandHeader>

          <BrandHeadline>
            Start Creating Professional QR Codes Today
          </BrandHeadline>

          <BrandDescription>
            Join thousands of businesses using our platform to create,
            customize, and track their QR codes.
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
            <User size={28} color="#1e293b" strokeWidth={2} />
          </IconContainer>

          <FormHeader>
            <FormTitle>Create your account</FormTitle>
            <FormSubtitle>
              Start creating and tracking QR codes
              <br />
              for free today
            </FormSubtitle>
          </FormHeader>

          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Name is required" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input
                prefix={<User size={16} style={{ color: "#94a3b8" }} />}
                placeholder="Full Name"
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

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email address" },
                {
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email format"
                },
              ]}
            >
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

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                { min: 8, message: "Password must be at least 8 characters" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: "Password must contain uppercase, lowercase, number and special character"
                },
              ]}
            >
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

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock size={16} style={{ color: "#94a3b8" }} />}
                placeholder="Confirm Password"
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

            <Form.Item style={{ marginBottom: "20px", marginTop: "8px" }}>
              <SubmitButton type="submit" loading={loading}>
                Get Started
              </SubmitButton>
            </Form.Item>

            <FooterText>
              Already have an account?{" "}
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <FooterLink>Sign In</FooterLink>
              </Link>
            </FooterText>
          </Form>
        </FormCard>
      </FormColumn>
    </AuthContainer>
  );
};

export default SignUp;
