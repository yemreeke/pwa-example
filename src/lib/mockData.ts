
export type MachineStatus = 'ACTIVE' | 'FAULTY' | 'MAINTENANCE';

export interface Machine {
    id: string;
    serial_no: string;
    block: string; // A-H
    unit: number; // 1-8
    slot: number; // 1-8
    model: string;
    th_s: number; // Hashrate
    status: MachineStatus;
    temperature: number;
}

const BLOCKS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const UNITS_PER_BLOCK = 8;
const SLOTS_PER_UNIT = 8;

export const generateMockData = (): Machine[] => {
    const machines: Machine[] = [];

    BLOCKS.forEach((block) => {
        for (let unit = 1; unit <= UNITS_PER_BLOCK; unit++) {
            for (let slot = 1; slot <= SLOTS_PER_UNIT; slot++) {
                const rand = Math.random();
                let status: MachineStatus = 'ACTIVE';
                if (rand > 0.95) status = 'FAULTY';
                else if (rand > 0.90) status = 'MAINTENANCE';

                machines.push({
                    id: `${block}-${unit}-${slot}`,
                    serial_no: `SN-${block}${unit}${slot}-${Math.floor(Math.random() * 10000)}`,
                    block,
                    unit,
                    slot,
                    model: 'Whatsminer M60',
                    th_s: status === 'ACTIVE' ? 150 + Math.random() * 10 : 0,
                    status,
                    temperature: status === 'ACTIVE' ? 65 + Math.random() * 15 : 25,
                });
            }
        }
    });

    return machines;
};

export const getStatusColor = (status: MachineStatus) => {
    switch (status) {
        case 'ACTIVE': return 'bg-emerald-500';
        case 'FAULTY': return 'bg-rose-500';
        case 'MAINTENANCE': return 'bg-amber-500';
        default: return 'bg-slate-500';
    }
};
