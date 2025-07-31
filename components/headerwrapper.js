"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import AdminHeader from '@/components/adminheader';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const excludedRoutes = ['/login', '/register'];
    const isExcluded = excludedRoutes.includes(pathname);

    const isAdmin = pathname.startsWith('/admin');

    if (isExcluded) return null;
    if (isAdmin) return <AdminHeader />;

    return <Header />;
}
