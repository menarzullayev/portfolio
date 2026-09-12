import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
  Youtube,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import type { SocialLink } from '@/lib/types';

const iconMap: Record<SocialLink['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
  instagram: Instagram,
  x: Twitter,
  youtube: Youtube,
  mail: Mail,
  phone: Phone,
  devto: Code2,
};

export function SocialIcon({
  icon,
  size = 16,
  className,
}: {
  icon: SocialLink['icon'];
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[icon] ?? Code2;
  return <Icon size={size} className={className} />;
}
