import { Layout, Menu, Button, Avatar, Typography } from 'antd';
import { QrCode, BarChart3, LogOut, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { Sider } = Layout;
const { Text } = Typography;

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
    <Sider
      width={240}
      style={{
        background: '#fff',
        borderRight: '1px solid #e8e8e8',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        

        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e8e8e8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: 16,
                fontWeight: 600,
              }}
              size={40}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Text strong style={{ display: 'block', fontSize: 14, color: '#1a1a1a' }}>
                {userName}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Premium User
              </Text>
            </div>
          </div>
        </div>
 

        {/* Navigation Menu */}
        <div style={{ flex: 1, padding: '8px 0' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
              border: 'none',
              background: 'transparent',
            }}
          />
        </div>

        {/* Logout Button at Bottom */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e8e8e8',
          marginTop: 'auto',
        }}>
          <Button
            danger
            icon={<LogOut size={18} />}
            onClick={onLogout}
            block
            size="large"
            style={{
              fontWeight: 600,
              height: 44,
              borderRadius: 8,
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
