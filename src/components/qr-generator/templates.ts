import { 
  Link as LinkIcon, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  MapPin,
  IndianRupee,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  UserCircle,
  FileText
} from 'lucide-react';

export interface QRTemplate {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }> | React.ComponentType<unknown>;
  type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi' | 'vcard' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  description: string;
  category: 'basic' | 'social' | 'business';
}

export const templates: QRTemplate[] = [
  // Basic Templates
  { id: 'url', name: 'Website URL', icon: LinkIcon, type: 'url', description: 'Link to any website', category: 'basic' },
  { id: 'upi', name: 'UPI Payment', icon: IndianRupee, type: 'upi', description: 'Receive UPI payments', category: 'business' },
  { id: 'email', name: 'Email', icon: Mail, type: 'email', description: 'Send an email', category: 'basic' },
  { id: 'phone', name: 'Phone', icon: Phone, type: 'phone', description: 'Make a phone call', category: 'basic' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, type: 'sms', description: 'Send a text message', category: 'basic' },
  { id: 'text', name: 'Text', icon: FileText, type: 'text', description: 'Plain text content', category: 'basic' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, type: 'wifi', description: 'Connect to WiFi', category: 'basic' },
  { id: 'location', name: 'Location', icon: MapPin, type: 'location', description: 'Share a location', category: 'basic' },
  
  // Social Media Templates
  { id: 'instagram', name: 'Instagram', icon: Instagram, type: 'instagram', description: 'Link to Instagram profile', category: 'social' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, type: 'facebook', description: 'Link to Facebook page', category: 'social' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, type: 'youtube', description: 'Link to YouTube channel', category: 'social' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, type: 'whatsapp', description: 'Start WhatsApp chat', category: 'social' },
  
  // Business Templates
  { id: 'vcard', name: 'Business Card', icon: UserCircle, type: 'vcard', description: 'Share contact information', category: 'business' },
];
