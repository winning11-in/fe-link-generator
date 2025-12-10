import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../dashboard/Sidebar';

const { Content } = Layout;

interface AppLayoutProps {
  children: any;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        userName={user?.name || 'User'}
        onCreateClick={() => navigate('/create')}
        onLogout={handleLogout}
      />
      
      <Layout style={{ marginLeft: 240, background: '#f5f5f5' }}>
        <Content style={{ padding: 24, minHeight: 'calc(100vh)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
