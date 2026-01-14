import React from 'react';
import { 
  ShoppingBag, 
  Car, 
  Music, 
  TrendingUp, 
  Coffee, 
  ScanLine, 
  Mic, 
  ChevronRight,
  Leaf,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Calendar,
  PieChart,
  Plus,
  Home,
  X,
  Check,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className, color }) => {
  const props = { size, className, color };
  
  switch (name) {
    case 'shopping-bag': return <ShoppingBag {...props} />;
    case 'car': return <Car {...props} />;
    case 'music': return <Music {...props} />;
    case 'trending-up': return <TrendingUp {...props} />;
    case 'coffee': return <Coffee {...props} />;
    case 'scan': return <ScanLine {...props} />;
    case 'mic': return <Mic {...props} />;
    case 'chevron-right': return <ChevronRight {...props} />;
    case 'chevron-left': return <ChevronLeft {...props} />;
    case 'leaf': return <Leaf {...props} />;
    case 'shield': return <ShieldCheck {...props} />;
    case 'zap': return <Zap {...props} />;
    case 'grid': return <LayoutGrid {...props} />;
    case 'calendar': return <Calendar {...props} />;
    case 'pie-chart': return <PieChart {...props} />;
    case 'plus': return <Plus {...props} />;
    case 'home': return <Home {...props} />;
    case 'x': return <X {...props} />;
    case 'check': return <Check {...props} />;
    case 'sparkles': return <Sparkles {...props} />;
    default: return <div />;
  }
};