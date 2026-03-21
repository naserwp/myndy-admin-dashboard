"use client";

import { useMemo, useState } from "react";
import {
	communicationLines,
	inboxThreadsByLine,
	messageChannels,
	timelineByThread,
	utilityIcons,
} from "@/data/communicationsMock";

const icon = {
	refresh: "↻",
	filter: "⚲",
	search: "⌕",
	book: "☰",
	archive: "⌂",
	star: "★",
	label: "🏷",
	more: "⋯",
	info: "ⓘ",
};

const formatLine = (line) => `${line.friendlyName} — ${line.formattedPhoneNumber}`;
const toTitle = (value) => value.replaceAll("_", "-").replace(/^./, (m) => m.toUpperCase());

const LineSwitchSkeleton = () => (
	<div className="space-y-2 p-3">
		{Array.from({ length: 4 }).map((_, i) => (
			<div key={i} className="h-16 animate-pulse rounded-xl bg-[#eff4fb]" />
		))}
	</div>
);

const Circle = ({ children, className = "" }) => (
	<span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#ccd8eb] bg-white text-xs text-[#3a4f73] ${className}`}>
		{children}
	</span>
);

const CommunicationsPrototype = () => {
	const [activeLineId, setActiveLineId] = useState(communicationLines[0].id);
	const [activeTab, setActiveTab] = useState("Chat");
	const [activeChannel, setActiveChannel] = useState("SMS");
	const [lineSwitching, setLineSwitching] = useState(false);

	const activeLine = useMemo(() => communicationLines.find((line) => line.id === activeLineId) ?? communicationLines[0], [activeLineId]);
	const lineThreads = useMemo(() => inboxThreadsByLine[activeLine.id] ?? [], [activeLine.id]);
	const [activeThreadId, setActiveThreadId] = useState(lineThreads[0]?.id ?? null);

	const selectedThread = lineThreads.find((thread) => thread.id === activeThreadId) ?? lineThreads[0];
	const timeline = timelineByThread[selectedThread?.id] ?? timelineByThread.default;

	const onSwitchLine = (nextLineId) => {
		if (nextLineId === activeLine.id) return;
		setLineSwitching(true);
		setTimeout(() => {
			setActiveLineId(nextLineId);
			const nextThreads = inboxThreadsByLine[nextLineId] ?? [];
			setActiveThreadId(nextThreads[0]?.id ?? null);
			setLineSwitching(false);
		}, 280);
	};

	return (
		<div className="h-full w-full overflow-hidden rounded-[18px] bg-[#edf4ff] p-3">
			<div className="grid h-full grid-cols-[330px_1fr] gap-3">
				<section className="flex min-h-0 flex-col overflow-hidden rounded-[16px] border border-[#cad8ec] bg-[#f8fbff]">
					<div className="border-b border-[#d9e3f2] px-3 py-2.5">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<h2 className="text-sm font-semibold text-[#1f3556]">Communications</h2>
								<span className="rounded-full bg-[#e2ffe8] px-2 py-0.5 text-[10px] font-semibold text-[#109944]">ON</span>
							</div>
							<div className="flex items-center gap-2">
								<Circle>{icon.refresh}</Circle>
								<button className="h-6 w-11 rounded-full bg-[#17b26a] p-0.5">
									<span className="block h-5 w-5 rounded-full bg-white shadow-sm" />
								</button>
							</div>
						</div>

						<div className="mt-2 rounded-xl border border-[#d6e2f2] bg-white p-2.5">
							<p className="text-[10px] font-semibold tracking-wide text-[#667a9b]">CURRENT LINE</p>
							<select
								value={activeLine.id}
								onChange={(e) => onSwitchLine(e.target.value)}
								className="mt-1 w-full rounded-lg border border-[#c9d6ea] bg-[#f7faff] px-2 py-1.5 text-xs font-medium text-[#233c61]"
							>
								{communicationLines.map((line) => (
									<option value={line.id} key={line.id}>
										{formatLine(line)}
									</option>
								))}
							</select>
							<div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-[#4f6588]">
								<p>
									<span className="font-semibold">Type:</span> {toTitle(activeLine.lineType)}
								</p>
								<p>
									<span className="font-semibold">Team:</span> {activeLine.assignedTeam?.name ?? "—"}
								</p>
								<p className="col-span-2 truncate">
									<span className="font-semibold">Users:</span> {activeLine.assignedUsers.map((u) => `${u.name} (${u.email})`).join(", ")}
								</p>
								<p className="col-span-2 truncate">
									<span className="font-semibold">Mailbox:</span> {activeLine.relatedEmail}
								</p>
							</div>
							<div className="mt-2 flex flex-wrap gap-1">
								{["Add user", "Manage settings", "Copy phone number", activeLine.isMuted ? "Unmute inbox" : "Mute this inbox"].map((label) => (
									<button key={label} className="rounded-md border border-[#cdd8ea] bg-[#f6f9ff] px-2 py-1 text-[10px] font-medium text-[#26446f]">
										{label}
									</button>
								))}
							</div>
						</div>

						<div className="mt-2 flex items-center justify-between">
							<div className="flex gap-1">
								{utilityIcons.map((utility) => (
									<Circle key={utility}>{icon[utility]}</Circle>
								))}
							</div>
							<button className="rounded-md border border-[#ccdaee] bg-white px-2 py-1 text-[10px] font-semibold text-[#3a4f73]">{icon.filter} Filter</button>
						</div>

						<div className="mt-2 flex gap-1 rounded-lg bg-[#e8effb] p-1">
							{["Chat", "Call"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`flex-1 rounded-md px-2 py-1 text-xs font-semibold ${activeTab === tab ? "bg-white text-[#223b61] shadow-sm" : "text-[#687d9f]"}`}
								>
									{tab}
								</button>
							))}
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto">
						{lineSwitching ? (
							<LineSwitchSkeleton />
						) : (
							<div className="space-y-1.5 p-2.5">
								{lineThreads.map((thread) => (
									<button
										key={thread.id}
										onClick={() => setActiveThreadId(thread.id)}
										className={`w-full rounded-xl border px-2.5 py-2 text-left ${selectedThread?.id === thread.id ? "border-[#8da7ce] bg-[#eaf2ff]" : "border-[#d6e2f3] bg-white"}`}
									>
										<div className="flex items-center justify-between text-[11px]">
											<p className="font-semibold text-[#1f3557]">{thread.name}</p>
											<p className="text-[#7184a4]">{thread.at}</p>
										</div>
										<p className="text-[10px] text-[#62789d]">{thread.phone}</p>
										<p className="mt-1 truncate text-xs text-[#324b70]">{thread.preview}</p>
										<div className="mt-1 flex items-center justify-between">
											<span className="rounded-md bg-[#eef3fc] px-1.5 py-0.5 text-[10px] font-medium text-[#4b6389]">{thread.badge}</span>
											{thread.unread > 0 ? <span className="rounded-full bg-[#1f3a62] px-1.5 py-0.5 text-[10px] text-white">{thread.unread}</span> : <span className="text-[10px] text-[#8ca0bf]">Read</span>}
										</div>
									</button>
								))}
							</div>
						)}
					</div>
				</section>

				<section className="flex min-h-0 flex-col overflow-hidden rounded-[16px] border border-[#cad8ec] bg-white">
					<div className="flex items-center justify-between border-b border-[#dbe6f5] px-4 py-3">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce8fb] text-xs font-bold text-[#27436d]">
								{(selectedThread?.name ?? "C").slice(0, 1)}
							</div>
							<div>
								<p className="text-sm font-semibold text-[#1f3557]">{selectedThread?.name ?? "Contact"}</p>
								<p className="text-[11px] text-[#6f84a4]">{formatLine(activeLine)}</p>
							</div>
						</div>
						<div className="flex items-center gap-1">
							{messageChannels.map((channel) => (
								<button
									key={channel}
									onClick={() => setActiveChannel(channel)}
									className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${activeChannel === channel ? "border-[#2d4e7f] bg-[#2d4e7f] text-white" : "border-[#d1dded] bg-white text-[#37557f]"}`}
								>
									{channel}
								</button>
							))}
							<Circle>{icon.info}</Circle>
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto bg-[#f9fbff] px-4 py-3">
						<div className="mx-auto max-w-[760px] space-y-3">
							{timeline.map((event) =>
								event.type === "call" ? (
									<div key={event.id} className="rounded-xl border border-[#cddcf0] bg-white p-3">
										<p className="text-xs font-semibold text-[#1f3659]">{event.title}</p>
										<p className="text-[11px] text-[#6880a3]">{event.meta}</p>
										<p className="mt-1 text-[10px] text-[#8aa0bf]">{event.time}</p>
									</div>
								) : (
									<div key={event.id} className={`max-w-[72%] rounded-2xl px-3 py-2 ${event.type === "out" ? "ml-auto bg-[#2c4e7f] text-white" : "bg-white text-[#2b456d] border border-[#d5e2f2]"}`}>
										<p className="text-xs leading-5">{event.body}</p>
										<p className={`mt-1 text-[10px] ${event.type === "out" ? "text-[#cfdaf1]" : "text-[#8aa0bf]"}`}>{event.time}</p>
									</div>
								),
							)}
						</div>
					</div>

					<div className="border-t border-[#dbe6f5] bg-white px-4 py-2.5">
						<div className="flex items-center gap-2 rounded-xl border border-[#cad8ec] bg-[#f4f8ff] px-2.5 py-2">
							<Circle className="h-6 w-6">＋</Circle>
							<input readOnly value="Write a message..." className="w-full bg-transparent text-xs text-[#6f84a4] outline-none" />
							<button className="rounded-md bg-[#2d4e7f] px-3 py-1 text-[11px] font-semibold text-white">Send</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default CommunicationsPrototype;
