import { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Popconfirm, Card, Typography, Select, Space } from 'antd';
import {   Trash2, Eye } from 'lucide-react';
import { contactAPI } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setContacts(response.contacts);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await contactAPI.updateStatus(id, status);
      message.success('Status updated successfully');
      fetchContacts();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await contactAPI.delete(id);
      message.success('Contact deleted successfully');
      fetchContacts();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to delete contact');
    }
  };

  const columns: ColumnsType<Contact> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 250,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text: string) => (
        <span style={{ maxWidth: 300, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string, record: Contact) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: '100%' }}
        >
          <Option value="new">
            <Tag color="blue">New</Tag>
          </Option>
          <Option value="read">
            <Tag color="orange">Read</Tag>
          </Option>
          <Option value="replied">
            <Tag color="green">Replied</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_: any, record: Contact) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => setSelectedContact(record)}
          />
          <Popconfirm
            title="Delete contact"
            description="Are you sure you want to delete this contact submission?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AppLayout>
      <div  >
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
               Contact Submissions
            </Title>
            <p style={{ color: '#8c8c8c' }}>
              Manage and respond to contact form submissions
            </p>
          </div>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={contacts}
            rowKey="_id"
            loading={loading}
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} submissions`,
            }}
          />
        </Card>

        {/* View Contact Modal */}
        {selectedContact && (
          <Card
            title="Contact Details"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
            extra={
              <Button onClick={() => setSelectedContact(null)}>Close</Button>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <strong>Name:</strong> {selectedContact.name}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Email:</strong> {selectedContact.email}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Subject:</strong> {selectedContact.subject}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Message:</strong>
              <p style={{ marginTop: 8, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
                {selectedContact.message}
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Status:</strong>{' '}
              <Tag
                color={
                  selectedContact.status === 'new'
                    ? 'blue'
                    : selectedContact.status === 'read'
                    ? 'orange'
                    : 'green'
                }
              >
                {selectedContact.status.toUpperCase()}
              </Tag>
            </div>
            <div>
              <strong>Received:</strong>{' '}
              {new Date(selectedContact.createdAt).toLocaleString()}
            </div>
          </Card>
        )}
        
        {selectedContact && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
            onClick={() => setSelectedContact(null)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default ContactSubmissions;
