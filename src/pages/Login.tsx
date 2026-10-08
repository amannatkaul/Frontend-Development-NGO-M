import { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, HeartHandshake, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../assets/hope-logo.jpeg';

interface LoginPageProps {
  onLogin: (email: string, remember: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    onLogin(email.trim(), remember);
    navigate('/dashboard', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#F0F5F8] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#0C2337] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-teal-500/10 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <img src={logoUrl} alt="Hope Foundation" className="h-12 w-12 rounded-xl object-cover" />
          <div>
            <div className="font-extrabold tracking-wide" style={{ fontFamily: 'Nunito, sans-serif' }}>HOPE FOUNDATION</div>
            <div className="text-xs text-teal-300">Making a difference, together</div>
          </div>
        </div>

        <div className="relative max-w-xl py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-semibold text-teal-200">
            <HeartHandshake size={15} />
            People-powered change
          </div>
          <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Every action brings us closer to a better tomorrow.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
            One place to coordinate projects, support communities, bring people together, and understand the impact we make.
          </p>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              { value: '24,670+', label: 'Lives reached' },
              { value: '38', label: 'Active projects' },
              { value: '1,284', label: 'Volunteers' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xl font-extrabold text-teal-300" style={{ fontFamily: 'Nunito, sans-serif' }}>{stat.value}</div>
                <div className="mt-1 text-[11px] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">Hope Foundation NGO Management System</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img src={logoUrl} alt="Hope Foundation" className="h-11 w-11 rounded-xl object-cover" />
            <div>
              <div className="font-extrabold text-slate-800" style={{ fontFamily: 'Nunito, sans-serif' }}>HOPE FOUNDATION</div>
              <div className="text-xs text-slate-500">NGO Management System</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-9">
            <div className="mb-7">
              <div className="mb-5 hidden h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 lg:flex">
                <ShieldCheck size={23} />
              </div>
              <p className="text-sm font-semibold text-teal-600">Welcome back</p>
              <h2 className="mt-1 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Sign in to HOPE</h2>
              <p className="mt-2 text-sm text-slate-500">Enter your account details to access your workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Work email</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="username"
                    required
                    className="form-input h-12 pl-11"
                    placeholder="you@hopefoundation.org"
                    value={email}
                    onChange={event => { setEmail(event.target.value); setError(''); }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setError('Password reset is not available in this demo. Contact your system administrator.')}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="form-input h-12 pl-11 pr-12"
                    placeholder="Enter your password"
                    value={password}
                    onChange={event => { setPassword(event.target.value); setError(''); }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(value => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={event => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-teal-600"
                />
                Keep me signed in on this device
              </label>

              {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

              <button type="submit" className="btn-primary flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold">
                Sign in
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs leading-5 text-amber-800">
              Demo sign-in: this frontend does not verify credentials. Connect an authentication service before using it with real accounts.
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Need access? <span className="font-semibold text-slate-600">Contact your system administrator.</span>
            </p>
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">© 2025 Hope Foundation · Secure access for our team</p>
        </div>
      </section>
    </main>
  );
}
