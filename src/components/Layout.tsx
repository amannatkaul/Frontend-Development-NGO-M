import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, CalendarDays, Users, Heart, DollarSign,
  BarChart3, MessageSquare, Settings, ChevronDown, ChevronRight, Bell,
  Search, UserCircle, Menu, X, Handshake, Gift, Target, Warehouse, FileText,
  BookUser, Briefcase, GraduationCap, UserCheck, Star, TrendingUp, Building2
} from 'lucide-react';
import logoUrl from '../assets/hope-logo.jpeg';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string; icon?: React.ReactNode }[];
}

const navConfig: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={17} />, path: '/dashboard' },
  {
    label: 'Projects', icon: <FolderKanban size={17} />,
    children: [
      { label: 'All Projects', path: '/projects', icon: <FolderKanban size={14} /> },
      { label: 'Proposals', path: '/projects/proposals', icon: <FileText size={14} /> },
      { label: 'Planning', path: '/projects/planning', icon: <Target size={14} /> },
    ]
  },
  {
    label: 'Events', icon: <CalendarDays size={17} />,
    children: [
      { label: 'All Events', path: '/events', icon: <CalendarDays size={14} /> },
      { label: 'Calendar', path: '/events/calendar', icon: <CalendarDays size={14} /> },
    ]
  },
  {
    label: 'People', icon: <Users size={17} />,
    children: [
      { label: 'HR Management', path: '/people/hr', icon: <Briefcase size={14} /> },
      { label: 'Interns', path: '/people/interns', icon: <GraduationCap size={14} /> },
      { label: 'Volunteers', path: '/people/volunteers', icon: <UserCheck size={14} /> },
    ]
  },
  { label: 'Beneficiaries', icon: <Heart size={17} />, path: '/beneficiaries' },
  {
    label: 'Donors', icon: <Handshake size={17} />,
    children: [
      { label: 'Donor Dashboard', path: '/donors', icon: <LayoutDashboard size={14} /> },
      { label: 'Directory', path: '/donors/directory', icon: <BookUser size={14} /> },
      { label: 'Contributions', path: '/donors/contributions', icon: <DollarSign size={14} /> },
      { label: 'Campaigns', path: '/donors/campaigns', icon: <Star size={14} /> },
      { label: 'Follow-Up', path: '/donors/followup', icon: <MessageSquare size={14} /> },
    ]
  },
  { label: 'Resources & Budget', icon: <Warehouse size={17} />, path: '/resources' },
  {
    label: 'Occasions', icon: <Gift size={17} />,
    children: [
      { label: 'Calendar', path: '/occasions', icon: <CalendarDays size={14} /> },
      { label: 'Engagement', path: '/engagement', icon: <Target size={14} /> },
      { label: 'Outcomes', path: '/outcomes', icon: <TrendingUp size={14} /> },
    ]
  },
  {
    label: 'Reports', icon: <BarChart3 size={17} />,
    children: [
      { label: 'Analytics', path: '/reports', icon: <BarChart3 size={14} /> },
      { label: 'Department', path: '/reports/department', icon: <Building2 size={14} /> },
    ]
  },
  { label: 'Communication', icon: <MessageSquare size={17} />, path: '/communication' },
  { label: 'Admin & Settings', icon: <Settings size={17} />, path: '/admin' },
];

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation();
  const isAnyChildActive = item.children?.some(c => location.pathname.startsWith(c.path)) ?? false;
  const [open, setOpen] = useState(isAnyChildActive);

  if (!item.children) {
    return (
      <NavLink
        to={item.path!}
        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
        title={collapsed ? item.label : undefined}
      >
        {item.icon}
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`sidebar-nav-item w-full ${isAnyChildActive ? 'active' : ''}`}
        title={collapsed ? item.label : undefined}
      >
        {item.icon}
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </>
        )}
      </button>
      {open && !collapsed && (
        <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-slate-700 pl-3">
          {item.children.map(child => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `sidebar-nav-item text-[13px] py-1.5 ${isActive ? 'active' : ''}`
              }
            >
              {child.icon}
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentTitle = (() => {
    for (const item of navConfig) {
      if (item.path && location.pathname === item.path) return item.label;
      if (item.children) {
        for (const c of item.children) {
          if (location.pathname.startsWith(c.path)) return c.label;
        }
      }
    }
    return 'Hope Foundation';
  })();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F0F5F8' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto h-full flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[60px]' : 'w-[240px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: '#0C2337', boxShadow: '2px 0 20px rgba(0,0,0,0.15)' }}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-700 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={logoUrl}
            alt="Hope Foundation"
            className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
          />
          {!collapsed && (
            <div>
              <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>HOPE</div>
              <div className="text-teal-400 text-[10px] font-semibold tracking-wider">Foundation</div>
            </div>
          )}
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 rounded-full items-center justify-center z-10 border border-slate-600"
          style={{ background: '#1AACB8', color: '#fff' }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} style={{ transform: 'rotate(90deg)' }} />}
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
          {!collapsed && <span className="sidebar-group-label">Main Menu</span>}
          {navConfig.slice(0, 6).map(item => (
            <NavGroup key={item.label} item={item} collapsed={collapsed} />
          ))}
          {!collapsed && <span className="sidebar-group-label">Programs</span>}
          {navConfig.slice(6, 9).map(item => (
            <NavGroup key={item.label} item={item} collapsed={collapsed} />
          ))}
          {!collapsed && <span className="sidebar-group-label">System</span>}
          {navConfig.slice(9).map(item => (
            <NavGroup key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-slate-700">
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#1AACB8' }}>
              <UserCircle size={18} className="text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-white text-xs font-semibold truncate">Admin User</div>
                <div className="text-slate-400 text-[10px] truncate">admin@hopefoundation.org</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top header */}
        <header className="flex items-center gap-3 px-5 py-3 border-b"
          style={{ background: '#fff', borderColor: '#E8EEF4', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <button
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {currentTitle}
            </h1>
            <p className="text-[11px] text-slate-400">Hope Foundation NGO Management System</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-teal-400 w-48"
              />
            </div>
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#1AACB8' }}>
              <UserCircle size={18} className="text-white" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
