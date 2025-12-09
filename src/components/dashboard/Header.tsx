import { Layout, Button, Space, Typography } from 'antd';
import { Plus, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  userName: string;
  onCreateClick: () => void;
  onLogout: () => void;
}

const Header = ({ onCreateClick, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AntHeader
      style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 50px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space size="large" align="center">
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            width: 40,
            height: 40,
            background: '#6366f1',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          QR
        </div>
        <Text
          strong
          style={{
            fontSize: 18,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/dashboard')}
        >
          QR Generator
        </Text>
        <Space size="middle" style={{ marginLeft: 20 }}>
          <Text
            strong={isActive('/dashboard')}
            onClick={() => navigate('/dashboard')}
            style={{
              cursor: 'pointer',
              color: isActive('/dashboard') ? '#6366f1' : 'rgba(0,0,0,0.45)',
              fontSize: 15,
            }}
          >
            Dashboard
          </Text>
          <Text
            strong={isActive('/analytics')}
            onClick={() => navigate('/analytics')}
            style={{
              cursor: 'pointer',
              color: isActive('/analytics') ? '#6366f1' : 'rgba(0,0,0,0.45)',
              fontSize: 15,
            }}
          >
            Analytics
          </Text>
        </Space>
      </Space>

      <Space>
        <Button
          type="primary"
          icon={<Plus size={18} />}
          onClick={onCreateClick}
          style={{
            background: '#6366f1',
            borderColor: '#6366f1',
            fontWeight: 600,
          }}
        >
          Create QR Code
        </Button>
        <Button
          type="text"
          icon={<LogOut size={18} />}
          onClick={onLogout}
          style={{
            fontWeight: 600,
            color: 'rgba(0,0,0,0.45)',
          }}
        >
          Logout
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
