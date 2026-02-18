import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: 'slate' | 'emerald' | 'rose' | 'amber';
}

const SummaryCard = ({ title, value, icon: Icon, trend, trendUp, color = 'slate' }: SummaryCardProps) => {
    const colorClasses = {
        slate: 'bg-slate-900 border-slate-800 text-slate-200',
        emerald: 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400',
        rose: 'bg-rose-950/30 border-rose-900/50 text-rose-400',
        amber: 'bg-amber-950/30 border-amber-900/50 text-amber-400',
    };

    return (
        <div className={clsx('p-4 rounded-xl border shadow-sm', colorClasses[color])}>
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-lg bg-black/20">
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className={clsx('text-xs font-medium px-1.5 py-0.5 rounded',
                        trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    )}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-xs font-medium opacity-70 uppercase tracking-wider">{title}</h3>
                <p className="text-2xl font-bold tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
