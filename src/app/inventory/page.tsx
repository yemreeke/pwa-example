'use client';

import { useEffect, useState } from 'react';
import { generateMockData, Machine } from '@/lib/mockData';
import BlockGrid from '@/components/BlockGrid';
import { Grid } from 'lucide-react';

export default function InventoryPage() {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setMachines(generateMockData());
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4 flex flex-col h-screen max-h-screen">
            <header className="flex items-center gap-3 mb-4 flex-shrink-0">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Grid size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">Inventory</h1>
                    <p className="text-xs text-slate-400">Manage Miners by Block</p>
                </div>
            </header>

            <div className="flex-1 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 check border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <BlockGrid machines={machines} />
                )}
            </div>
        </div>
    );
}
