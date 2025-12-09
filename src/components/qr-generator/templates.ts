import { 
  Link as LinkIcon, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  MapPin,
  IndianRupee
} from 'lucide-react';

export interface QRTemplate {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }> | React.ComponentType<unknown>;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi';
  description: string;
}

export const templates: QRTemplate[] = [
  { id: 'url', name: 'Website URL', icon: LinkIcon, type: 'url', description: 'Link to any website' },
  { id: 'upi', name: 'UPI Payment', icon: IndianRupee, type: 'upi', description: 'Receive UPI payments' },
  { id: 'email', name: 'Email', icon: Mail, type: 'email', description: 'Send an email' },
  { id: 'phone', name: 'Phone', icon: Phone, type: 'phone', description: 'Make a phone call' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, type: 'sms', description: 'Send a text message' },
  { id: 'text', name: 'Text', icon: MessageSquare, type: 'text', description: 'Plain text content' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, type: 'wifi', description: 'Connect to WiFi' },
  { id: 'location', name: 'Location', icon: MapPin, type: 'location', description: 'Share a location' },
];
