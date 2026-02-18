'use client';

import { ScanBarcode } from 'lucide-react';

const ScannerFAB = () => {
    return (
        <button
            className="fixed bottom-20 right-4 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-900/50 transition-transform hover:scale-105 active:scale-95"
            aria-label="Scan Machine"
            onClick={() => alert('Camera scanner would open here')}
        >
            <ScanBarcode size={28} />
        </button>
    );
};

export default ScannerFAB;
