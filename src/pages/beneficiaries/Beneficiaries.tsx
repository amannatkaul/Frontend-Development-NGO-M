import { useState } from 'react';
import { Plus, Search, Heart, MapPin, Filter, Eye, Edit2 } from 'lucide-react';

const beneficiaries = [
  { id: 'BNF-001', name: 'Ramesh Chauhan', age: 45, gender: 'Male', location: 'Dharavi, Mumbai', category: 'Health', project: 'Healthcare Outreach', enrolled: '15 Mar 2025', status: 'Active', services: ['Medical Checkup', 'Medicine Supply'] },
  { id: 'BNF-002', name: 'Geeta Kumari', age: 32, gender: 'Female', location: 'Nashik', category: 'Education', project: 'Digital Literacy Drive', enrolled: '1 Jun 2025', status: 'Active', services: ['Computer Training', 'Tablet Provided'] },
  { id: 'BNF-003', name: 'Suresh Patil', age: 55, gender: 'Male', location: 'Pune Rural', category: 'Water', project: 'Clean Water Initiative', enrolled: '10 Apr 2025', status: 'Active', services: ['Borewell Access', 'Water Filter'] },
  { id: 'BNF-004', name: 'Ananya Singh', age: 14, gender: 'Female', location: 'Varanasi', category: 'Education', project: 'Girls Education Scholarship', enrolled: '1 Jul 2025', status: 'Active', services: ['Scholarship', 'Books & Stationery'] },
  { id: 'BNF-005', name: 'Kanta Bai', age: 68, gender: 'Female', location: 'Delhi', category: 'Elderly', project: 'Old Age Care Home', enrolled: '15 Feb 2025', status: 'Inactive', services: ['Day Care', 'Meals', 'Healthcare'] },
  { id: 'BNF-006', name: 'Raj Kumar', age: 38, gender: 'Male', location: 'Jaipur', category: 'Livelihood', project: 'Women Empowerment Hub', enrolled: '20 May 2025', status: 'Active', services: ['Skill Training', 'Microfinance'] },
];

const categories = ['All', 'Health', 'Education', 'Water', 'Elderly', 'Livelihood', 'Nutrition'];

const catColors: Record<string, string> = {
  Health: 'badge badge-red',
  Education: 'badge badge-blue',
  Water: 'badge badge-teal',
  Elderly: 'badge badge-purple',
  Livelihood: 'badge badge-green',
  Nutrition: 'badge badge-yellow',
};

export default function BeneficiariesPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);

  const filtered = beneficiaries.filter(b =>
    (catFilter === 'All' || b.category === catFilter) &&
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Beneficiaries</h1>
          <p className="page-subtitle">Track and manage all program beneficiaries across projects</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>
          <Plus size={16} /> Add Beneficiary
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Beneficiaries', value: '24,670', color: '#1AACB8' },
          { label: 'New This Month', value: '312', color: '#10B981' },
          { label: 'Active Programs', value: '38', color: '#6366F1' },
          { label: 'Geographic Reach', value: '12 States', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { cat: 'Health', count: 8420, icon: '🏥' },
          { cat: 'Education', count: 6280, icon: '📚' },
          { cat: 'Water', count: 4800, icon: '💧' },
          { cat: 'Nutrition', count: 2950, icon: '🥗' },
          { cat: 'Livelihood', count: 1820, icon: '💼' },
          { cat: 'Elderly', count: 400, icon: '👴' },
        ].map(c => (
          <div key={c.cat} className="stat-card flex flex-col items-center text-center gap-1 cursor-pointer hover:border-teal-300 border border-transparent transition-all"
            onClick={() => setCatFilter(c.cat)}>
            <span className="text-2xl">{c.icon}</span>
            <div className="font-bold text-slate-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{c.count.toLocaleString()}</div>
            <div className="text-[11px] text-slate-500">{c.cat}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Register New Beneficiary</span>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Full Name', 'Age', 'Gender', 'Location / Village', 'District', 'State', 'Category', 'Assigned Project', 'Contact Number', 'Aadhaar / ID Number'].map(f => (
              <div key={f}>
                <label className="form-label">{f}</label>
                <input className="form-input" placeholder={`Enter ${f.toLowerCase()}...`} />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="form-label">Services to be Provided</label>
              <textarea className="form-input h-20 resize-none" placeholder="List services..." />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn-primary">Register Beneficiary</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters + table */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search beneficiaries..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                catFilter === c ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
              }`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Age/Gender</th><th>Location</th><th>Category</th><th>Project</th><th>Enrolled</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td className="text-xs text-slate-400">{b.id}</td>
                  <td className="font-semibold text-slate-800">{b.name}</td>
                  <td className="text-xs">{b.age}y · {b.gender}</td>
                  <td>
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin size={11} className="text-slate-400" /> {b.location}
                    </div>
                  </td>
                  <td><span className={catColors[b.category] ?? 'badge badge-gray'}>{b.category}</span></td>
                  <td className="text-xs text-slate-600 max-w-[160px] truncate">{b.project}</td>
                  <td className="text-xs text-slate-500">{b.enrolled}</td>
                  <td><span className={b.status === 'Active' ? 'badge badge-green' : 'badge badge-gray'}>{b.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded hover:bg-teal-50 text-slate-400 hover:text-teal-600"><Eye size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Edit2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} records
        </div>
      </div>
    </div>
  );
}
