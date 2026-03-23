import Link from "next/link";

const navItems = [
	{ href: "/admin/communications", label: "Communications", icon: "CM" },
	{ href: "/admin", label: "Dashboard", icon: "DB" },
	{ href: "/admin/conversations", label: "Conversations", icon: "CV" },
	{ href: "#", label: "Contacts", icon: "CT" },
	{ href: "#", label: "Settings", icon: "ST" },
];

export default function Sidebar() {
	return (
		<aside className="min-w-[220px] text-white">
			<div className="mb-4 rounded-[12px] bg-[#3f5679] px-3 py-3">
				<div className="mb-2 flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-xs font-bold">M</div>
					<div>
						<p className="text-[10px] uppercase tracking-[0.12em] text-white/65">Myndy</p>
						<p className="text-sm font-semibold leading-4">Communications</p>
					</div>
				</div>
				<div className="rounded-[10px] border border-white/10 bg-white/10 px-2.5 py-2">
					<p className="text-[10px] uppercase tracking-wide text-white/60">Workspace</p>
					<p className="text-xs font-semibold">Red Spectrum</p>
					<p className="text-[10px] text-white/70">clientsupport@theredspectrum.com</p>
				</div>
			</div>

			<nav className="space-y-1.5">
				{navItems.map((item) => (
					<Link key={item.label} href={item.href} className="flex items-center gap-2 rounded-[10px] px-2.5 py-2 text-sm text-white/90 hover:bg-white/10">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/5 text-xs">{item.icon}</span>
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}
