"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Upload Artwork", href: "/admin/upload" },
    { label: "Manage Artworks", href: "/admin/manageartworks" },
    { label: "Subscribers", href: "/admin/subscribers" },
    { label: "Contact Messages", href: "/admin/contacts" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md py-4 px-6 sticky top-0 z-50">
      <nav className="flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <ul className="flex space-x-6 mt-2 sm:mt-0">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-purple-400 transition ${
                  pathname === href ? "text-purple-500 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
