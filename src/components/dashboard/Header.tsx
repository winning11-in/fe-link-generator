import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <AntHeader
      style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        height: 64,
      }}
    >
      <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
        {title}
      </Title>
    </AntHeader>
  );
};

export default Header;
