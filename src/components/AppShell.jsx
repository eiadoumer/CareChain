import { Bell, Heart, LogOut, Search, ShieldCheck } from "lucide-react";
import { InitialsAvatar } from "./ui";

export default function AppShell({ role, onLogout, children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="h-16 bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto h-full px-5 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Heart className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-slate-900 tracking-tight">
                Discharge<span className="text-blue-600">IQ</span>
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider hidden sm:block">
                {role.name} · Portal
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-100 border border-transparent focus:bg-white focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure session
            </div>
            <button className="relative text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right leading-tight hidden sm:block">
                <div className="text-sm font-semibold text-slate-900">{role.user}</div>
                <div className="text-xs text-slate-500">{role.detail}</div>
              </div>
              <InitialsAvatar name={role.user} tone={role.tone} size="md" />
            </div>
            <button
              onClick={onLogout}
              title="Sign out"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-5 py-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
