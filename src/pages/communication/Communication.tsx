import { useState } from 'react';
import { Plus, Send, Mail, MessageSquare, Bell, Users, Search } from 'lucide-react';

const messages = [
  { id: 1, from: 'Priya Sharma', subject: 'Update on Clean Water Initiative', preview: 'Hi team, I wanted to share the latest progress report from the...', time: '10:32 AM', read: false, type: 'Internal' },
  { id: 2, from: 'Tata Trust (External)', subject: 'Q4 CSR Collaboration', preview: 'We are pleased to confirm our continued support for the Q4 CSR...', time: '9:15 AM', read: false, type: 'External' },
  { id: 3, from: 'Rahul Mehta', subject: 'System maintenance notice', preview: 'The data portal will be down for 2 hours on Saturday...', time: 'Yesterday', read: true, type: 'Internal' },
  { id: 4, from: 'Sunita Roy', subject: 'Volunteer orientation feedback', preview: 'Great session today! 42 out of 50 participants rated it 5 stars...', time: 'Yesterday', read: true, type: 'Internal' },
  { id: 5, from: 'Ramesh Gupta (Donor)', subject: 'Happy to support again!', preview: 'Dear Hope Foundation, I wanted to reach out to express my continued...', time: '5 Oct', read: true, type: 'Donor' },
];

const announcements = [
  { title: 'Diwali Office Hours Notice', date: '7 Oct 2025', audience: 'All Staff', priority: 'Normal' },
  { title: 'Q4 Fundraising Push – All Hands', date: '5 Oct 2025', audience: 'All Staff', priority: 'High' },
  { title: 'New Volunteer Batch Orientation', date: '3 Oct 2025', audience: 'Volunteers', priority: 'Normal' },
];

const broadcasts = [
  { title: 'Diwali Greetings to All Donors', recipients: 4820, status: 'Scheduled', date: '13 Nov 2025', channel: 'Email + WhatsApp' },
  { title: 'Q3 Impact Update Newsletter', recipients: 2340, status: 'Sent', date: '1 Oct 2025', channel: 'Email' },
  { title: 'Volunteer Appreciation Message', recipients: 1284, status: 'Sent', date: '28 Sep 2025', channel: 'WhatsApp' },
];

const typeStyle: Record<string, string> = {
  Internal: 'badge badge-blue',
  External: 'badge badge-teal',
  Donor: 'badge badge-green',
};

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Communication</h1>
          <p className="page-subtitle">Internal messaging, donor communication, and broadcasts</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCompose(s => !s)}>
          <Plus size={16} /> Compose
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Unread Messages', value: '2', color: '#EF4444' },
          { label: 'Sent This Week', value: '28', color: '#1AACB8' },
          { label: 'Broadcasts Active', value: '3', color: '#6366F1' },
          { label: 'Announcements', value: '5', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {showCompose && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Compose Message</span>
            <button onClick={() => setShowCompose(false)} className="text-slate-400">✕</button>
          </div>
          <div className="card-body flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">To</label>
                <input className="form-input" placeholder="Search recipient or group..." />
              </div>
              <div>
                <label className="form-label">Channel</label>
                <select className="form-input">
                  <option>Internal Message</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>SMS</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Subject</label>
              <input className="form-input" placeholder="Enter subject..." />
            </div>
            <div>
              <label className="form-label">Message</label>
              <textarea className="form-input h-28 resize-none" placeholder="Type your message..." />
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary" onClick={() => setShowCompose(false)}>Cancel</button>
              <button className="btn-primary"><Send size={14} /> Send Message</button>
            </div>
          </div>
        </div>
      )}

      <div className="tab-bar w-fit">
        {['inbox', 'announcements', 'broadcasts', 'donor-communication'].map(t => (
          <button key={t} className={`tab-item capitalize ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>{t.replace('-', ' ')}</button>
        ))}
      </div>

      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Message list */}
          <div className="card lg:col-span-1 overflow-hidden">
            <div className="card-header">
              <span className="card-title">Inbox</span>
              <span className="badge badge-red">2 new</span>
            </div>
            <div className="flex flex-col divide-y divide-slate-100">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${selected === msg.id ? 'bg-teal-50' : ''}`}
                  onClick={() => setSelected(msg.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!msg.read && <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1.5" />}
                      <div className={`text-sm ${!msg.read ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{msg.from}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{msg.time}</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${!msg.read ? 'font-semibold text-slate-700' : 'text-slate-500'} truncate`}>{msg.subject}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{msg.preview}</div>
                  <span className={`${typeStyle[msg.type]} mt-1.5 inline-block`}>{msg.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message detail */}
          <div className="card lg:col-span-2">
            {selected ? (() => {
              const msg = messages.find(m => m.id === selected)!;
              return (
                <div className="h-full flex flex-col">
                  <div className="card-header flex-col items-start gap-1">
                    <div className="font-bold text-slate-800">{msg.subject}</div>
                    <div className="text-xs text-slate-400">From: {msg.from} · {msg.time}</div>
                    <span className={typeStyle[msg.type]}>{msg.type}</span>
                  </div>
                  <div className="card-body flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed">{msg.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We look forward to continued collaboration on this important initiative.</p>
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
                    <textarea className="form-input flex-1 h-12 resize-none text-sm" placeholder="Type a reply..." />
                    <button className="btn-primary text-sm py-2"><Send size={14} /></button>
                  </div>
                </div>
              );
            })() : (
              <div className="flex items-center justify-center h-full min-h-[300px] text-slate-300">
                <div className="text-center">
                  <MessageSquare size={40} className="mx-auto mb-2" />
                  <p className="text-sm">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="flex flex-col gap-3">
          <button className="btn-primary self-start"><Plus size={15} /> New Announcement</button>
          {announcements.map((a, i) => (
            <div key={i} className="card">
              <div className="card-body flex items-center gap-4">
                <div className="p-2.5 rounded-xl" style={{ background: '#E6F7F9' }}>
                  <Bell size={18} style={{ color: '#1AACB8' }} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">{a.title}</div>
                  <div className="text-xs text-slate-400">{a.date} · Audience: {a.audience}</div>
                </div>
                <span className={a.priority === 'High' ? 'badge badge-red' : 'badge badge-gray'}>{a.priority}</span>
                <button className="btn-secondary text-xs py-1">View</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'broadcasts' && (
        <div className="card overflow-hidden">
          <div className="card-header">
            <span className="card-title">Mass Communications & Broadcasts</span>
            <button className="btn-primary text-xs py-1.5"><Plus size={13} /> New Broadcast</button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr><th>Campaign</th><th>Recipients</th><th>Channel</th><th>Date</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {broadcasts.map((b, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-slate-800">{b.title}</td>
                    <td>{b.recipients.toLocaleString()}</td>
                    <td className="text-xs text-slate-600">{b.channel}</td>
                    <td className="text-xs">{b.date}</td>
                    <td><span className={b.status === 'Sent' ? 'badge badge-green' : 'badge badge-yellow'}>{b.status}</span></td>
                    <td><button className="btn-secondary text-xs py-1">View Report</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'donor-communication' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: 'Thank You Notes', count: 42, icon: '💌', desc: 'Post-donation acknowledgements sent this month' },
            { type: 'Impact Updates', count: 18, icon: '📊', desc: 'Impact reports shared with active donors' },
            { type: 'Pledge Reminders', count: 8, icon: '🔔', desc: 'Payment reminders sent for upcoming pledges' },
            { type: 'Re-engagement', count: 12, icon: '🤝', desc: 'Lapsed donor re-engagement campaigns' },
          ].map(c => (
            <div key={c.type} className="card hover:shadow-md transition-shadow">
              <div className="card-body flex items-center gap-4">
                <span className="text-3xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">{c.type}</div>
                  <div className="text-xs text-slate-500">{c.desc}</div>
                </div>
                <div className="text-2xl font-extrabold" style={{ color: '#1AACB8', fontFamily: 'Nunito, sans-serif' }}>{c.count}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
