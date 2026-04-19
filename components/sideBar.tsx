"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { FiCompass } from "react-icons/fi";
import { IoFileTrayStacked } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import ThemeToggle from "./toggleTheme";

const sidebarItems = [
  { label: "Home", href: "/", icon: MdHome },
  { label: "Explore", href: "/explore", icon: FiCompass },
  { label: "Genre", href: "/genre", icon: IoFileTrayStacked },
  { label: "Favourites", href: "/favourites", icon: GrFavorite },
  { label: "Watch Later", href: "/watch-later", icon: FaBookmark },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`h-full text-slate-900 dark:text-slate-100 bg-linear-to-b from-slate-50/90 to-slate-100/70 dark:from-slate-900/80 dark:to-slate-950/70 border border-slate-300/70 dark:border-slate-700/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.14)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-lg p-3 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      aria-label="Sidebar"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 overflow-hidden">
          <HiOutlineMenuAlt3 className="text-2xl shrink-0" />
          {!isCollapsed && (
            <p className="text-xl font-bold whitespace-nowrap">RSM Watch</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="rounded-md border border-slate-300 dark:border-slate-700 p-1.5 hover:bg-slate-200/70 dark:hover:bg-slate-800/70 transition"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <TbLayoutSidebarLeftExpand className="text-lg" />
          ) : (
            <TbLayoutSidebarLeftCollapse className="text-lg" />
          )}
        </button>
      </div>

      <nav>
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 transition ${
                    isActive
                      ? "bg-violet-200/70 text-violet-900 dark:bg-violet-500/25 dark:text-violet-100"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
                  } ${isCollapsed ? "justify-center" : "gap-3"}`}
                >
                  <Icon
                    className={`text-xl ${isActive ? "text-violet-700 dark:text-violet-300" : "text-slate-600 dark:text-slate-300"}`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="relative top-0 w-full flex justify-center items-center">
        <ThemeToggle />
      </div>
    </aside>
  );
}
