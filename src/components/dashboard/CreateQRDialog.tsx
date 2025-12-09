import { Modal, Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;

interface CreateQRDialogProps {
  open: boolean;
  onClose: () => void;
  formData: {
    title: string;
    data: string;
    type: 'url' | 'text' | 'email' | 'phone';
  };
  onFormChange: (field: string, value: string) => void;
  onCreate: () => void;
  isSubmitting?: boolean;
}

const CreateQRDialog = ({
  open,
  onClose,
  formData,
  onFormChange,
  onCreate,
  isSubmitting,
}: CreateQRDialogProps) => {
  const getPlaceholder = () => {
    switch (formData.type) {
      case 'url':
        return 'https://example.com';
      case 'email':
        return 'email@example.com';
      case 'phone':
        return '+1234567890';
      default:
        return 'Your text here';
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Create New QR Code</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="create"
          type="primary"
          loading={isSubmitting}
          disabled={!formData.title || !formData.data}
          onClick={onCreate}
          style={{
            background: '#6366f1',
            borderColor: '#6366f1',
            fontWeight: 600,
          }}
        >
          Create
        </Button>,
      ]}
      width={600}
    >
      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item label="Title" required>
          <Input
            placeholder="My QR Code"
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            size="large"
          />
        </Form.Item>

        <Form.Item label="Type" required>
          <Select
            value={formData.type}
            onChange={(value) => onFormChange('type', value)}
            size="large"
          >
            <Select.Option value="url">URL</Select.Option>
            <Select.Option value="text">Text</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="phone">Phone</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Data" required>
          <TextArea
            rows={3}
            placeholder={getPlaceholder()}
            value={formData.data}
            onChange={(e) => onFormChange('data', e.target.value)}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateQRDialog;
