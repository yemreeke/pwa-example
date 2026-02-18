'use client';

import { Machine, getStatusColor } from '@/lib/mockData';
import { X, Thermometer, Cpu, Activity, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface MachineDetailModalProps {
    machine: Machine | null;
    onClose: () => void;
}

const MachineDetailModal = ({ machine, onClose }: MachineDetailModalProps) => {
    if (!machine) return null;

    const handleReportFault = () => {
        // In a real app, this would call an API
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl z-[60] text-sm animate-in fade-in slide-in-from-top-4 duration-300';
        toast.innerText = `${machine.serial_no} için arıza bildirildi`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer/Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-700 rounded-full sm:hidden" />

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full"
                >
                    <X size={20} />
                </button>

                <div className="mt-2 text-center mb-6">
                    <div className={clsx(
                        'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 text-3xl font-bold text-white shadow-lg',
                        getStatusColor(machine.status)
                    )}>
                        {machine.slot}
                    </div>
                    <h2 className="text-xl font-bold text-white">{machine.model}</h2>
                    <p className="text-slate-400 text-sm">{machine.serial_no}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                            <Thermometer size={14} /> Sıcaklık
                        </div>
                        <div className="text-lg font-semibold text-white">{machine.temperature.toFixed(1)}°C</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                            <Activity size={14} /> Hashrate
                        </div>
                        <div className="text-lg font-semibold text-white">{machine.th_s.toFixed(1)} <span className="text-xs">TH/s</span></div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                            <Cpu size={14} /> Ünite
                        </div>
                        <div className="text-lg font-semibold text-white">Blok {machine.block} - U{machine.unit}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-xs uppercase mb-1">
                            <Activity size={14} /> Durum
                        </div>
                        <div className={clsx(
                            "text-lg font-semibold",
                            machine.status === 'ACTIVE' ? 'text-emerald-400' :
                                machine.status === 'FAULTY' ? 'text-rose-400' : 'text-amber-400'
                        )}>{machine.status === 'ACTIVE' ? 'AKTİF' : machine.status === 'FAULTY' ? 'ARIZALI' : 'BAKIMDA'}</div>
                    </div>
                </div>

                <button
                    onClick={handleReportFault}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <AlertTriangle size={18} />
                    Arıza Bildir
                </button>
            </div>
        </div>
    );
};

export default MachineDetailModal;
