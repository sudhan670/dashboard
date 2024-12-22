import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HelpCircle,
  FileBarChart,
  Settings,
  GraduationCap,
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', active: false },
    { icon: <Users />, label: 'Students', active: true },
    { icon: <BookOpen />, label: 'Chapters', active: false },
    { icon: <HelpCircle />, label: 'Help', active: false },
    { icon: <FileBarChart />, label: 'Reports', active: false },
    { icon: <Settings />, label: 'Settings', active: false },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4 hidden md:block">
      <div className="flex items-center justify-center mb-8 space-x-2">
        <GraduationCap className="h-8 w-8 text-white" />
        <h1 className="text-white text-xl font-bold">Quyl</h1>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-2 cursor-pointer ${
              item.active
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;