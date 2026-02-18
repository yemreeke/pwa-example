'use client';

import { Settings, User, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
    const settingsGroups = [
        {
            title: 'Account',
            options: [
                { icon: User, label: 'Profile', value: 'Operator' },
                { icon: Bell, label: 'Notifications', value: 'On' },
                { icon: Shield, label: 'Security', value: '' },
            ]
        },
        {
            title: 'System',
            options: [
                { icon: Settings, label: 'Preferences', value: '' },
            ]
        }
    ];

    return (
        <div className="p-4 h-full">
            <header className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-200">
                    <Settings size={24} />
                </div>
                <h1 className="text-xl font-bold text-white">Settings</h1>
            </header>

            <div className="space-y-6">
                {settingsGroups.map((group) => (
                    <div key={group.title} className="space-y-2">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">{group.title}</h2>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.label}
                                    className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <opt.icon size={18} className="text-slate-400" />
                                        <span className="text-sm font-medium text-slate-200">{opt.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">{opt.value}</span>
                                        <ChevronRight size={16} className="text-slate-600" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="w-full p-4 rounded-xl bg-rose-950/30 border border-rose-900/30 text-rose-400 flex items-center justify-center gap-2 font-medium hover:bg-rose-900/20 transition-colors mt-8">
                    <LogOut size={18} />
                    Sign Out
                </button>

                <div className="text-center text-xs text-slate-600 mt-8">
                    Bitcoin Facility Manager v1.0.0
                </div>
            </div>
        </div>
    );
}
