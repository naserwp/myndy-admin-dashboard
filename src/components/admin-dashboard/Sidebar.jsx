import Link from "next/link";
import React from "react";

const navigation = [
	{ href: "/admin", label: "Dashboard" },
	{ href: "/admin/communications", label: "Communications" },
	{ href: "/admin/conversations", label: "Legacy Conversations" },
];

const Sidebar = () => {
	return (
		<div className="min-w-[220px] border-b border-white/20 pb-4 text-white sm:border-b-0 sm:border-r sm:pr-6">
			<div className="text-lg font-semibold tracking-wide">MYNDY</div>
			<div className="mt-8 flex flex-col gap-y-2">
				{navigation.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
