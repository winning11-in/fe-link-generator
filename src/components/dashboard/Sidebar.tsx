import { Layout, Menu, Button, Avatar, Typography } from 'antd';
import { QrCode, BarChart3, LogOut, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

const { Sider } = Layout;
const { Text } = Typography;

const StyledSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #e8e8e8;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserSection = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserDetails = styled.div`
  flex: 1;
  overflow: hidden;
`;

const MenuSection = styled.div`
  flex: 1;
  padding: 8px 0;
`;

const StyledMenu = styled(Menu)`
  border: none;
  background: transparent;

  .ant-menu-item {
    margin-bottom: 16px;
  }

  .ant-menu-item:last-child {
    margin-bottom: 0;
  }
`;

const LogoutSection = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e8e8e8;
  margin-top: auto;
`;

const StyledAvatar = styled(Avatar)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: 16px;
  font-weight: 600;
`;

const StyledLogoutButton = styled(Button)`
  font-weight: 600;
  height: 44px;
  border-radius: 8px;
`;

interface SidebarProps {
  userName: string;
  onCreateClick: () => void;
  onLogout: () => void;
}

const Sidebar = ({ userName, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <QrCode size={20} />,
      label: 'My QR Codes',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/analytics',
      icon: <BarChart3 size={20} />,
      label: 'Analytics',
      onClick: () => navigate('/analytics'),
    },
    {
      key: '/faqs',
      icon: <HelpCircle size={20} />,
      label: 'FAQs',
      onClick: () => navigate('/faqs'),
    },
    {
      key: '/contact',
      icon: <Mail size={20} />,
      label: 'Contact Us',
      onClick: () => navigate('/contact'),
    },
    ...(user?.isAdmin ? [{
      key: '/admin/contacts',
      icon: <MessageSquare size={20} />,
      label: 'Contact Submissions',
      onClick: () => navigate('/admin/contacts'),
    }] : []),
  ];

  return (
    <StyledSider width={240}>
      <SidebarContainer>
        <UserSection>
          <UserInfo>
            <StyledAvatar size={40}>
              {userName.charAt(0).toUpperCase()}
            </StyledAvatar>
            <UserDetails>
              <Text strong style={{ display: 'block', fontSize: 14, color: '#1a1a1a' }}>
                {userName}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Premium User
              </Text>
            </UserDetails>
          </UserInfo>
        </UserSection>

        <MenuSection>
          <StyledMenu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
          />
        </MenuSection>

        <LogoutSection>
          <StyledLogoutButton
            danger
            icon={<LogOut size={18} />}
            onClick={onLogout}
            block
            size="large"
          >
            Logout
          </StyledLogoutButton>
        </LogoutSection>
      </SidebarContainer>
    </StyledSider>
  );
};

export default Sidebar;
