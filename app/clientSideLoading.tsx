"use client";

export default function ClientSideLoading() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<div className="flex items-center gap-2" aria-label="Loading" role="status">
				<span className="h-3 w-3 animate-bounce rounded-full bg-slate-700 dark:bg-slate-200 [animation-delay:-0.3s]" />
				<span className="h-3 w-3 animate-bounce rounded-full bg-slate-700 dark:bg-slate-200 [animation-delay:-0.15s]" />
				<span className="h-3 w-3 animate-bounce rounded-full bg-slate-700 dark:bg-slate-200" />
			</div>
			<p className="text-sm font-medium text-slate-600 dark:text-slate-300">Loading...</p>
		</div>
	);
}
