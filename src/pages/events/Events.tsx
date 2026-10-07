import { useState } from 'react';
import { Plus, MapPin, Calendar, Users, Clock, Search } from 'lucide-react';

const events = [
  { id: 1, title: 'Annual Donors Gala 2025', type: 'Fundraiser', date: '15 Nov 2025', time: '6:00 PM', location: 'Taj Hotel, Mumbai', organizer: 'Priya Sharma', capacity: 200, registered: 148, status: 'Upcoming', budget: '₹3,50,000' },
  { id: 2, title: 'Volunteer Orientation – Batch 12', type: 'Training', date: '22 Oct 2025', time: '10:00 AM', location: 'Hope Foundation HQ, Delhi', organizer: 'Rahul Mehta', capacity: 50, registered: 42, status: 'Upcoming', budget: '₹15,000' },
  { id: 3, title: 'Health Camp – Dharavi', type: 'Outreach', date: '28 Oct 2025', time: '8:00 AM', location: 'Dharavi Community Hall, Mumbai', organizer: 'Dr. Anita Patel', capacity: 500, registered: 387, status: 'Upcoming', budget: '₹85,000' },
  { id: 4, title: 'Board Review Meeting Q3', type: 'Meeting', date: '5 Nov 2025', time: '11:00 AM', location: 'Online (Zoom)', organizer: 'Admin', capacity: 20, registered: 18, status: 'Upcoming', budget: '₹0' },
  { id: 5, title: 'School Supply Drive – Nashik', type: 'Community', date: '10 Oct 2025', time: '9:00 AM', location: 'Nashik District Schools', organizer: 'Sunita Roy', capacity: 150, registered: 150, status: 'Completed', budget: '₹45,000' },
  { id: 6, title: 'Fundraising Marathon', type: 'Fundraiser', date: '8 Oct 2025', time: '6:00 AM', location: 'Cubbon Park, Bengaluru', organizer: 'Vikram Singh', capacity: 1000, registered: 826, status: 'Completed', budget: '₹1,20,000' },
];

const typeStyle: Record<string, string> = {
  Fundraiser: 'badge badge-teal',
  Training: 'badge badge-blue',
  Outreach: 'badge badge-green',
  Meeting: 'badge badge-gray',
  Community: 'badge badge-purple',
};

const statusStyle: Record<string, string> = {
  Upcoming: 'badge badge-yellow',
  Completed: 'badge badge-green',
  Cancelled: 'badge badge-red',
};

export default function EventsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Plan and manage all Hope Foundation events</p>
        </div>
        <button className="btn-primary"><Plus size={16} /> Create Event</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: '24', color: '#1AACB8' },
          { label: 'Upcoming', value: '9', color: '#6366F1' },
          { label: 'Participants Registered', value: '3,842', color: '#10B981' },
          { label: 'Funds Raised (Events)', value: '₹18.4L', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tab-bar">
          <button className={`tab-item ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
          <button className={`tab-item ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(e => (
            <div key={e.id} className="card hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-2" style={{ background: e.status === 'Completed' ? '#10B981' : '#1AACB8' }} />
              <div className="card-body flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={typeStyle[e.type]}>{e.type}</span>
                  <span className={statusStyle[e.status]}>{e.status}</span>
                </div>
                <div className="font-bold text-slate-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{e.title}</div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5"><Calendar size={12} /> {e.date} at {e.time}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={12} /> {e.location}</div>
                  <div className="flex items-center gap-1.5"><Users size={12} /> {e.registered}/{e.capacity} registered</div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{
                    width: `${(e.registered / e.capacity * 100).toFixed(0)}%`,
                    background: '#1AACB8'
                  }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Organizer: {e.organizer}</span>
                  <span className="text-xs font-semibold text-slate-600">Budget: {e.budget}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary flex-1 text-xs py-1.5">View Details</button>
                  <button className="btn-primary flex-1 text-xs py-1.5">Manage</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td className="font-semibold text-slate-800">{e.title}</td>
                    <td><span className={typeStyle[e.type]}>{e.type}</span></td>
                    <td className="text-xs">{e.date} · {e.time}</td>
                    <td className="text-xs">{e.location}</td>
                    <td>{e.registered}/{e.capacity}</td>
                    <td><span className={statusStyle[e.status]}>{e.status}</span></td>
                    <td>{e.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
