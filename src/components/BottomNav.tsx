'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ScanLine, Settings } from 'lucide-react';
import clsx from 'clsx';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Anasayfa', href: '/', icon: Home },
        { name: 'Envanter', href: '/inventory', icon: Grid },
        { name: 'Tara', href: '/scan', icon: ScanLine }, // Dummy route
        { name: 'Ayarlar', href: '/settings', icon: Settings }, // Dummy route
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950 pb-safe z-50">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'flex flex-col items-center justify-center w-full h-full space-y-1',
                                isActive ? 'text-emerald-500' : 'text-slate-500 hover:text-slate-400'
                            )}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
