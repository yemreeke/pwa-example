'use client';

import { useEffect, useState } from 'react';
import { generateMockData, Machine } from '@/lib/mockData';
import SummaryCard from '@/components/SummaryCard';
import { Activity, Server, AlertTriangle, Zap } from 'lucide-react';

export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setMachines(generateMockData());
  }, []);

  const stats = {
    total: machines.length,
    active: machines.filter(m => m.status === 'ACTIVE').length,
    faulty: machines.filter(m => m.status === 'FAULTY').length,
    maintenance: machines.filter(m => m.status === 'MAINTENANCE').length,
    hashrate: machines.reduce((acc, m) => acc + m.th_s, 0),
    revenue: machines.reduce((acc, m) => acc + (m.status === 'ACTIVE' ? 0.45 : 0), 0), // Mock revenue
  };

  const activeRate = stats.total > 0 ? (stats.active / stats.total) * 100 : 0;

  return (
    <div className="p-4 pb-24 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Facility Overview</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
          <span className="font-bold text-indigo-400">BF</span>
        </div>
      </header>

      {/* Health Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Simple CSS Pie Chart representation using conic-gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #10b981 0% ${activeRate}%, 
                  #f43f5e ${activeRate}% ${activeRate + (stats.faulty / stats.total) * 100}%,
                  #f59e0b ${activeRate + (stats.faulty / stats.total) * 100}% 100%
                )`
              }}
            />
            <div className="absolute inset-3 bg-slate-900 rounded-full flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{activeRate.toFixed(0)}%</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 w-full text-center">
            <div>
              <div className="text-emerald-400 font-bold text-lg">{stats.active}</div>
              <div className="text-[10px] text-slate-500 uppercase">Running</div>
            </div>
            <div>
              <div className="text-rose-400 font-bold text-lg">{stats.faulty}</div>
              <div className="text-[10px] text-slate-500 uppercase">Faulty</div>
            </div>
            <div>
              <div className="text-amber-400 font-bold text-lg">{stats.maintenance}</div>
              <div className="text-[10px] text-slate-500 uppercase">Maint.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <SummaryCard
          title="Total Hashrate"
          value={`${(stats.hashrate / 1000).toFixed(2)} PH/s`}
          icon={Activity}
          trend="+2.4%"
          trendUp={true}
          color="emerald"
        />
        <SummaryCard
          title="Total Machines"
          value={stats.total}
          icon={Server}
          color="slate"
        />
        <SummaryCard
          title="Daily Revenue"
          value={`$${stats.revenue.toFixed(0)}`}
          icon={Zap}
          trend="-1.2%"
          trendUp={false}
          color="amber"
        />
        <SummaryCard
          title="Critical Alerts"
          value={stats.faulty > 0 ? `${stats.faulty} unit(s)` : 'None'}
          icon={AlertTriangle}
          color={stats.faulty > 0 ? "rose" : "slate"}
        />
      </div>
    </div>
  );
}
