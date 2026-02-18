'use client';

import { useState, useMemo } from 'react';
import { Machine, getStatusColor } from '@/lib/mockData';
import clsx from 'clsx';
import MachineDetailModal from './MachineDetailModal';

interface BlockGridProps {
    machines: Machine[];
}

const BLOCKS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const BlockGrid = ({ machines }: BlockGridProps) => {
    const [selectedBlock, setSelectedBlock] = useState('A');
    const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

    const filteredMachines = useMemo(() => {
        return machines.filter(m => m.block === selectedBlock);
    }, [machines, selectedBlock]);

    // Group by Unit
    const units = useMemo(() => {
        const grouped: Record<number, Machine[]> = {};
        filteredMachines.forEach(m => {
            if (!grouped[m.unit]) grouped[m.unit] = [];
            grouped[m.unit].push(m);
        });
        return grouped;
    }, [filteredMachines]);

    return (
        <div className="flex flex-col h-full">
            {/* Block Tabs */}
            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                {BLOCKS.map(block => (
                    <button
                        key={block}
                        onClick={() => setSelectedBlock(block)}
                        className={clsx(
                            'px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap',
                            selectedBlock === block
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                        )}
                    >
                        Block {block}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 pb-24">
                {Object.entries(units).map(([unitId, unitMachines]) => (
                    <div key={unitId} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                        <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                            Unit {unitId}
                        </h3>
                        <div className="grid grid-cols-4 gap-1.5">
                            {unitMachines.sort((a, b) => a.slot - b.slot).map(machine => (
                                <button
                                    key={machine.id}
                                    onClick={() => setSelectedMachine(machine)}
                                    className={clsx(
                                        'aspect-square rounded-md transition-all hover:scale-110 hover:brightness-125 hover:shadow-lg',
                                        getStatusColor(machine.status)
                                    )}
                                    aria-label={`Slot ${machine.slot} - ${machine.status}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <MachineDetailModal
                machine={selectedMachine}
                onClose={() => setSelectedMachine(null)}
            />
        </div>
    );
};

export default BlockGrid;
