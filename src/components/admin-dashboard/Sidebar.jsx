import Link from "next/link";

const navItems = [
	{ href: "/admin/communications", label: "Communications", icon: "💬" },
	{ href: "/admin", label: "Dashboard", icon: "▦" },
	{ href: "/admin/conversations", label: "Conversations", icon: "☷" },
	{ href: "#", label: "Contacts", icon: "👥" },
	{ href: "#", label: "Settings", icon: "⚙" },
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
const items = [
	{ href: "/admin/communications", label: "Communications", icon: "✉" },
	{ href: "/admin", label: "Dashboard", icon: "◻" },
	{ href: "/admin/conversations", label: "Conversations", icon: "☰" },
const navigation = [
	{ href: "/admin", label: "Dashboard" },
	{ href: "/admin/communications", label: "Communications" },
	{ href: "/admin/conversations", label: "Legacy Conversations" },
];

const Sidebar = () => {
	return (
		<aside className="min-w-[205px] text-white sm:pr-5">
			<div className="rounded-xl border border-white/15 bg-[#42587a] p-3">
				<p className="text-[11px] uppercase tracking-[0.12em] text-white/60">Myndy</p>
				<p className="text-lg font-semibold leading-5">Communications</p>
				<div className="mt-3 rounded-lg bg-white/10 p-2">
					<p className="text-[10px] text-white/65">Workspace</p>
					<p className="text-xs font-medium">Red Spectrum</p>
					<p className="text-[10px] text-white/65">clientsupport@theredspectrum.com</p>
				</div>
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

			<nav className="mt-4 space-y-1">
				{items.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-white/90 transition hover:bg-white/10"
					>
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/5 text-xs">{item.icon}</span>
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
};

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
