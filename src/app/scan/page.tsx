'use client';

import { ScanBarcode } from 'lucide-react';
import ScannerFAB from '@/components/ScannerFAB';

export default function ScanPage() {
    return (
        <div className="p-4 h-full flex flex-col items-center justify-center relative">
            <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-700 animate-pulse">
                    <ScanBarcode size={48} className="text-slate-500" />
                </div>
                <h1 className="text-2xl font-bold text-white">Scan QR Code</h1>
                <p className="text-slate-400 max-w-xs mx-auto">
                    Point your camera at a machine's QR code to view details or report a fault.
                </p>
            </div>

            {/* Camera simulation rectangle */}
            <div className="mt-12 w-64 h-64 border-2 border-emerald-500/50 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 -translate-x-1 -translate-y-1 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 translate-x-1 -translate-y-1 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 -translate-x-1 translate-y-1 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 translate-x-1 translate-y-1 rounded-br-xl" />

                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
            </div>

            <ScannerFAB />
        </div>
    );
}
