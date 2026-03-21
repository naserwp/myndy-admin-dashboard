import Link from "next/link";

export default function AdminLandingPage() {
	return (
		<div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-8">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-slate-900">Myndy Admin</h1>
				<p className="mt-2 text-sm text-slate-600">Open the static Communications Inbox prototype.</p>
				<Link
					href="/admin/communications"
					className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
				>
					Go to Communications
				</Link>
			</div>
		</div>
	);
}
