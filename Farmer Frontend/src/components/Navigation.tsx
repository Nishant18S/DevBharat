import React from 'react';
import { 
  BarChart3, 
  Store, 
  HandCoins, 
  Package, 
  Upload, 
  ShoppingCart, 
  Brain, 
  Bot 
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'subsidy', label: 'Schemes', icon: HandCoins },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'upload', label: 'Upload Product', icon: Upload },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'ai-schemes', label: 'AI Recommendations', icon: Brain },
  ];

  return (
    <nav className="nav-tabs">
      <div className="nav-tabs-inner">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <IconComponent size={16} />
              {item.label}
            </button>
          );
        })}
        <button
          className="nav-tab"
          onClick={() => window.location.href = 'demochatbot.html'}
        >
          <Bot size={16} />
          AI Chatbot
        </button>
      </div>
    </nav>
  );
};

export default Navigation;