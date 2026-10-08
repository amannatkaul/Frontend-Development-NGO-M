import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit2, Trash2, FolderKanban } from 'lucide-react';
import {
  Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';

const projects = [
  { id: 1, name: 'Clean Water Initiative', category: 'Environment', status: 'Active', lead: 'Priya Sharma', budget: '₹8,50,000', spent: '₹5,78,000', beneficiaries: 2400, progress: 68, startDate: '1 Mar 2025', endDate: '31 Dec 2025' },
  { id: 2, name: 'Digital Literacy Drive', category: 'Education', status: 'Active', lead: 'Rahul Mehta', budget: '₹3,20,000', spent: '₹1,44,000', beneficiaries: 850, progress: 45, startDate: '1 Jun 2025', endDate: '15 Feb 2026' },
  { id: 3, name: 'Healthcare Outreach', category: 'Health', status: 'Planning', lead: 'Anita Patel', budget: '₹5,60,000', spent: '₹67,200', beneficiaries: 0, progress: 12, startDate: '1 Apr 2026', endDate: '30 Sep 2026' },
  { id: 4, name: 'School Renovation – Nashik', category: 'Education', status: 'Completed', lead: 'Vikram Singh', budget: '₹2,10,000', spent: '₹2,08,500', beneficiaries: 420, progress: 100, startDate: '1 Jan 2025', endDate: '10 Oct 2025' },
  { id: 5, name: 'Women Empowerment Hub', category: 'Social', status: 'Active', lead: 'Sunita Roy', budget: '₹4,75,000', spent: '₹2,61,250', beneficiaries: 320, progress: 55, startDate: '15 Apr 2025', endDate: '28 Feb 2026' },
  { id: 6, name: 'Nutrition for Children', category: 'Health', status: 'Active', lead: 'Deepak Rao', budget: '₹1,80,000', spent: '₹90,000', beneficiaries: 650, progress: 50, startDate: '1 Jul 2025', endDate: '30 Jun 2026' },
  { id: 7, name: 'Rural Connectivity', category: 'Technology', status: 'Planning', lead: 'Neha Joshi', budget: '₹6,90,000', spent: '₹0', beneficiaries: 0, progress: 8, startDate: '1 Jan 2026', endDate: '31 Dec 2026' },
  { id: 8, name: 'Old Age Care Home', category: 'Social', status: 'On Hold', lead: 'Amit Kumar', budget: '₹3,40,000', spent: '₹1,02,000', beneficiaries: 85, progress: 30, startDate: '1 Feb 2025', endDate: '30 Apr 2026' },
];

const statusColors: Record<string, string> = {
  Active: '#1AACB8',
  Planning: '#6366F1',
  Completed: '#10B981',
  'On Hold': '#F59E0B',
};

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

const parseCurrency = (amount: string) =>
  Number(amount.replace(/[^\d]/g, ''));

const statusStyle: Record<string, string> = {
  Active: 'badge badge-teal',
  Planning: 'badge badge-blue',
  Completed: 'badge badge-green',
  'On Hold': 'badge badge-yellow',
};

const catColors: Record<string, string> = {
  Environment: 'badge badge-green',
  Education: 'badge badge-blue',
  Health: 'badge badge-red',
  Social: 'badge badge-purple',
  Technology: 'badge badge-gray',
};

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = projects.filter(p =>
    (statusFilter === 'All' || p.status === statusFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const statusData = Object.entries(
    filtered.reduce<Record<string, number>>((counts, project) => {
      counts[project.status] = (counts[project.status] ?? 0) + 1;
      return counts;
    }, {}),
  ).map(([name, value]) => ({ name, value, color: statusColors[name] }));
  const budgetData = Object.entries(
    filtered.reduce<Record<string, { budget: number; spent: number }>>((totals, project) => {
      const category = totals[project.category] ?? { budget: 0, spent: 0 };
      category.budget += parseCurrency(project.budget);
      category.spent += parseCurrency(project.spent);
      totals[project.category] = category;
      return totals;
    }, {}),
  ).map(([category, totals]) => ({ category, ...totals }));
  const beneficiaryData = filtered
    .filter(project => project.beneficiaries > 0)
    .map(project => ({ name: project.name, beneficiaries: project.beneficiaries }));
  const progressData = [...filtered]
    .sort((a, b) => b.progress - a.progress)
    .map(project => ({ name: project.name, progress: project.progress }));

  return (
    <div className="flex flex-col gap-5">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Manage all NGO projects from inception to completion</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '38', color: '#1AACB8' },
          { label: 'Active', value: '12', color: '#10B981' },
          { label: 'In Planning', value: '5', color: '#6366F1' },
          { label: 'Completed', value: '18', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="form-input pl-9" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Active', 'Planning', 'Completed', 'On Hold'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  statusFilter === s
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">Project Status Mix</span>
              <p className="text-xs text-slate-400 mt-1">Based on {filtered.length} matching projects</p>
            </div>
          </div>
          <div className="card-body">
            {statusData.length ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-44 h-44 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={76} paddingAngle={3}>
                        {statusData.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-extrabold text-slate-800">{filtered.length}</span>
                    <span className="text-[11px] text-slate-400">projects</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {statusData.map(entry => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
                      <span className="text-slate-500">{entry.name}</span>
                      <span className="font-semibold text-slate-700">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-44 flex items-center justify-center text-sm text-slate-400">No matching projects</div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">Budget by Category</span>
              <p className="text-xs text-slate-400 mt-1">Planned budget compared with spend</p>
            </div>
          </div>
          <div className="card-body">
            {budgetData.length ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={budgetData} barGap={5}>
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#94A3B8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={value => `₹${Number(value) / 100000}L`}
                  />
                  <Tooltip
                    formatter={(value, name) => [formatCurrency(Number(value)), name === 'budget' ? 'Budget' : 'Spent']}
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="budget" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="Budget" />
                  <Bar dataKey="spent" fill="#1AACB8" radius={[4, 4, 0, 0]} name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-44 flex items-center justify-center text-sm text-slate-400">No matching projects</div>
            )}
          </div>
        </div>

        <div className="card xl:col-span-2">
          <div className="card-header">
            <div>
              <span className="card-title">Beneficiaries Reached</span>
              <p className="text-xs text-slate-400 mt-1">Reach by project with recorded beneficiaries</p>
            </div>
          </div>
          <div className="card-body">
            {beneficiaryData.length ? (
              <ResponsiveContainer width="100%" height={Math.max(190, beneficiaryData.length * 42)}>
                <BarChart data={beneficiaryData} layout="vertical" barSize={18} margin={{ left: 8 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={170}
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="beneficiaries" fill="#6366F1" radius={[0, 5, 5, 0]} name="Beneficiaries" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-44 flex items-center justify-center text-sm text-slate-400">No matching projects with recorded beneficiaries</div>
            )}
          </div>
        </div>

        <div className="card xl:col-span-2">
          <div className="card-header">
            <div>
              <span className="card-title">Project Delivery Progress</span>
              <p className="text-xs text-slate-400 mt-1">Completion progress across matching projects</p>
            </div>
          </div>
          <div className="card-body">
            {progressData.length ? (
              <ResponsiveContainer width="100%" height={Math.max(190, progressData.length * 42)}>
                <BarChart data={progressData} layout="vertical" barSize={18} margin={{ left: 8 }}>
                  <XAxis type="number" domain={[0, 100]} tickFormatter={value => `${value}%`} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={170} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={value => [`${value}%`, 'Progress']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="progress" fill="#1AACB8" radius={[0, 5, 5, 0]} name="Progress" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-44 flex items-center justify-center text-sm text-slate-400">No matching projects</div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Lead</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Beneficiaries</th>
                <th>Progress</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td className="text-slate-400 text-xs">{i + 1}</td>
                  <td className="font-semibold text-slate-800">{p.name}</td>
                  <td><span className={catColors[p.category] ?? 'badge badge-gray'}>{p.category}</span></td>
                  <td><span className={statusStyle[p.status]}>{p.status}</span></td>
                  <td>{p.lead}</td>
                  <td className="font-medium text-slate-700">{p.budget}</td>
                  <td className="text-slate-500">{p.spent}</td>
                  <td>{p.beneficiaries.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full"
                          style={{ width: `${p.progress}%`, background: p.progress === 100 ? '#10B981' : '#1AACB8' }} />
                      </div>
                      <span className="text-xs text-slate-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{p.endDate}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-teal-50 text-slate-400 hover:text-teal-600 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}
