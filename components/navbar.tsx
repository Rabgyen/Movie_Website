"use client";

import { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function NavBar(){
  const router = useRouter();
   const [search, setSearch] = useState("");
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if(!search.trim()) return;

    router.push(`/search?query=${encodeURIComponent(search)}`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "New movie added: John Wick 4", time: "2m ago" },
    { id: 2, text: "Your subscription was renewed", time: "1h ago" },
    { id: 3, text: "Special offer: 50% off Premium", time: "3h ago" },
  ];


  return (
    <nav className="relative flex items-center justify-between w-full px-4 py-3 bg-white border-b border-gray-200 dark:bg-[#0a0a0a] dark:border-gray-800">

      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-gray-800 dark:text-white"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSearch();
            }
          }}
          />
          <IoMdSearch className="absolute right-5 top-1/2 -translate-y-1/2" onClick={handleSearch} />
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotifyOpen(!isNotifyOpen)}
            className={`relative p-2 rounded-full transition-colors ${isNotifyOpen ? 'bg-gray-100 dark:bg-gray-800 text-blue-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {isNotifyOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in zoom-in duration-150 dark:bg-gray-900 dark:border-gray-800">
              <div className="px-4 py-2 font-semibold text-gray-800 border-b border-gray-100 dark:text-white dark:border-gray-800">
                Notifications
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 dark:hover:bg-gray-800 dark:border-gray-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{n.text}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors dark:hover:bg-blue-900/20">
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center">
          <div className="w-9 h-9 overflow-hidden border-2 border-gray-200 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
              className="object-cover w-full h-full"
              alt="Profile"
            />
          </div>
        </button>

      </div>
    </nav>
  );

}