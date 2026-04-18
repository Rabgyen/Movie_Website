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
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const navItems = [
	{ label: "Home", href: "/", icon: MdHome },
	{ label: "Explore", href: "/explore", icon: FiCompass },
	{ label: "Genre", href: "/genre", icon: IoFileTrayStacked },
	{ label: "Favourites", href: "/favourites", icon: GrFavorite },
	{ label: "Watch Later", href: "/watch-later", icon: FaBookmark },
];

export default function NavBar() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const pathname = usePathname();

	return (
		<aside
			className={`h-full bg-linear-to-b from-white/12 to-white/6 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-lg p-3 transition-all duration-300 ${
				isCollapsed ? "w-20" : "w-64"
			}`}
			aria-label="Sidebar"
		>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-2 text-[#b496ec] overflow-hidden">
					<HiOutlineMenuAlt3 className="text-2xl shrink-0" />
					{!isCollapsed && <p className="text-xl font-bold whitespace-nowrap">RSM Watch</p>}
				</div>

				<button
					type="button"
					onClick={() => setIsCollapsed((prev) => !prev)}
					className="rounded-md border border-white/50 p-1.5 hover:bg-white/10 transition"
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
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;

						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`group flex items-center rounded-md px-3 py-2 transition ${
										isActive
											? "bg-[#b496ec]/25 text-white"
											: "text-white/80 hover:bg-white/10 hover:text-white"
									} ${isCollapsed ? "justify-center" : "gap-3"}`}
								>
									<Icon className={`text-xl ${isActive ? "text-[#b496ec]" : "text-white/90"}`} />
									{!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
