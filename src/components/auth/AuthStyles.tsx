import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #f8fafc;
`;

export const BrandingColumn = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const DecorativeCircle = styled.div<{ size: string; top?: string; right?: string; bottom?: string; left?: string }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
`;

export const BrandingContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 500px;
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const BrandTitle = styled.h2`
  margin: 0 0 0 16px;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
`;

export const BrandHeadline = styled.h3`
  color: #fff;
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 300;
  line-height: 1.4;
`;

export const BrandDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  display: block;
  margin-bottom: 48px;
  line-height: 1.6;
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: start;
  gap: 16px;
`;

export const FeatureIcon = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeatureTitle = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
`;

export const FeatureDescription = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #f0f4f8;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 36px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

export const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  background: #f8f9fa;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const FormTitle = styled.h2`
  margin: 0;
  color: #1e293b;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FormSubtitle = styled.p`
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-size: 14px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  padding: 0 16px 0 40px;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: #fff;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ForgotPasswordLink = styled.span`
  color: #1e293b;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button<{ loading?: boolean }>`
  width: 100%;
  height: 48px;
  background: #1e293b;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  cursor: ${props => props.loading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  opacity: ${props => props.loading ? 0.7 : 1};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;

  &:hover:not(:disabled) {
    background: ${props => props.loading ? '#1e293b' : '#0f172a'};
    transform: ${props => props.loading ? 'none' : 'translateY(-1px)'};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* Spinner */
  ${props => props.loading && `
    &::before {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
  `}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Divider = styled.div`
  text-align: center;
  margin: 24px 0;
  position: relative;
`;

export const DividerLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid #e2e8f0;
`;

export const DividerText = styled.span`
  color: #94a3b8;
  font-size: 13px;
  background: #ffffff;
  padding: 0 12px;
  position: relative;
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
`;

export const SocialButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FooterText = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 14px;
`;

export const FooterLink = styled.span`
  color: #1e293b;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
