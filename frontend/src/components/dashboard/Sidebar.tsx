import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  School, 
  ClipboardCheck, 
  GraduationCap, 
  Bell, 
  BarChart3,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Students', path: '/dashboard/students' },
  { icon: UserSquare2, label: 'Teachers', path: '/dashboard/teachers' },
  { icon: School, label: 'Batches', path: '/dashboard/batches' },
  { icon: ClipboardCheck, label: 'Attendance', path: '/dashboard/attendance' },
  { icon: GraduationCap, label: 'Results', path: '/dashboard/results' },
  { icon: Bell, label: 'Notices', path: '/dashboard/notices' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen glass-dark border-r border-white/5 flex flex-col p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <GraduationCap className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl text-white">SmartEdu</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 transition-colors mt-auto">
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};
