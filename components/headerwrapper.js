"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const excludedRoutes = ['/login', '/register', '/forgot-password'];
    const isExcluded = excludedRoutes.includes(pathname);

    const isAdmin = pathname.startsWith('/admin');

    if (isExcluded) return null;
    if (isAdmin) return null;

    return <Header />;
}
