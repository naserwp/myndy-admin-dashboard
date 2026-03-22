"use client";

import { useMemo, useState } from "react";
import { communicationLines, inboxThreadsByLine, messageChannels, timelineByThread, utilityIcons } from "@/data/communicationsMock";

const iconMap = {
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
};

const formatLine = (line) => `${line.friendlyName} — ${line.formattedPhoneNumber}`;
const lineTypeLabel = (type) => type.replace("_", "-");

const CircleBtn = ({ children }) => (
	<button className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#c8d6ea] bg-white text-[11px] text-[#37537f]">{children}</button>
);

export default function CommunicationsPrototype() {
	const [activeLineId, setActiveLineId] = useState(communicationLines[0].id);
	const [activeThreadId, setActiveThreadId] = useState(inboxThreadsByLine[communicationLines[0].id][0]?.id);
	const [activeTab, setActiveTab] = useState("Chat");
	const [activeChannel, setActiveChannel] = useState("SMS");
	const [switching, setSwitching] = useState(false);

	const activeLine = useMemo(() => communicationLines.find((line) => line.id === activeLineId) ?? communicationLines[0], [activeLineId]);
	const threads = useMemo(() => inboxThreadsByLine[activeLine.id] ?? [], [activeLine.id]);
	const selectedThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];
	const timeline = timelineByThread[selectedThread?.id] ?? timelineByThread.default;

	const switchLine = (nextId) => {
		if (nextId === activeLine.id) return;
		setSwitching(true);
		setTimeout(() => {
			setActiveLineId(nextId);
			setActiveThreadId(inboxThreadsByLine[nextId]?.[0]?.id ?? null);
			setSwitching(false);
		}, 220);
	};

	return (
		<div className="h-full overflow-hidden rounded-[16px] bg-[#eaf3ff] p-2.5">
			<div className="grid h-full grid-cols-[320px_1fr] gap-2.5">
				<div className="flex min-h-0 flex-col rounded-[14px] border border-[#cad9ed] bg-[#f8fbff]">
					<div className="border-b border-[#d7e3f3] px-3 py-2">
						<div className="mb-2 flex items-center justify-between">
							<div className="flex items-center gap-1.5">
								<p className="text-sm font-semibold text-[#1c3354]">Communications</p>
								<span className="rounded-full bg-[#def8e5] px-1.5 py-0.5 text-[10px] font-semibold text-[#0f9551]">ON</span>
							</div>
							<div className="flex items-center gap-1.5">
								<CircleBtn>{iconMap.refresh}</CircleBtn>
								<div className="h-6 w-11 rounded-full bg-[#13b86b] p-[2px]">
									<div className="ml-auto h-5 w-5 rounded-full bg-white" />
								</div>
							</div>
						</div>

						<label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667a9b]">Current Line</label>
						<select
							value={activeLine.id}
							onChange={(e) => switchLine(e.target.value)}
							className="mt-1 w-full rounded-[9px] border border-[#c8d7ea] bg-white px-2 py-1.5 text-xs font-medium text-[#243e63]"
						>
							{communicationLines.map((line) => (
								<option key={line.id} value={line.id}>
									{formatLine(line)}
								</option>
							))}
						</select>

						<div className="mt-1.5 space-y-0.5 text-[10px] text-[#5f7699]">
							<p>
								<span className="font-semibold text-[#405a81]">Type:</span> {lineTypeLabel(activeLine.lineType)} · <span className="font-semibold text-[#405a81]">Team:</span> {activeLine.assignedTeam?.name ?? "—"}
							</p>
							<p className="truncate">
								<span className="font-semibold text-[#405a81]">Users:</span> {activeLine.assignedUsers.map((user) => user.name).join(", ")}
							</p>
							<p className="truncate">
								<span className="font-semibold text-[#405a81]">Email:</span> {activeLine.relatedEmail}
							</p>
						</div>

						<div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-semibold text-[#365783]">
							<button>Add user</button>
							<button>Manage settings</button>
							<button>Copy phone number</button>
							<button>Mute this inbox</button>
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
								{utilityIcons.map((item) => (
									<CircleBtn key={item}>{iconMap[item]}</CircleBtn>
								))}
							</div>
							<button className="rounded-[8px] border border-[#c8d7ea] bg-white px-2 py-1 text-[10px] font-semibold text-[#39557f]">{iconMap.filter} Filter</button>
						</div>

						<div className="mt-2 flex items-center gap-1">
							<div className="flex flex-1 rounded-[8px] bg-[#e6eefc] p-1">
								{["Chat", "Call"].map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`flex-1 rounded-[6px] px-2 py-1 text-xs font-semibold ${activeTab === tab ? "bg-white text-[#263f64]" : "text-[#6f82a2]"}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto p-2">
						{switching ? (
							<div className="space-y-2">
								{Array.from({ length: 5 }).map((_, idx) => (
									<div key={idx} className="h-14 animate-pulse rounded-[10px] bg-[#eaf1fd]" />
								))}
							</div>
						) : (
							<div className="space-y-1.5">
								{threads.map((thread) => (
									<button
										key={thread.id}
										onClick={() => setActiveThreadId(thread.id)}
										className={`w-full rounded-[10px] border px-2.5 py-2 text-left ${selectedThread?.id === thread.id ? "border-[#8ea7cd] bg-[#eaf2ff]" : "border-[#d5e2f3] bg-white"}`}
									>
										<div className="flex items-center justify-between text-[11px]">
											<p className="font-semibold text-[#1f3658]">{thread.name}</p>
											<p className="text-[#7588a7]">{thread.at}</p>
										</div>
										<p className="text-[10px] text-[#6a80a2]">{thread.phone}</p>
										<p className="mt-0.5 truncate text-xs text-[#334d74]">{thread.preview}</p>
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
import { useEffect, useMemo, useState } from "react";
import { channelTabs, communicationLines, inboxThreads, sampleConversation } from "@/data/communicationsMock";

const formatLine = (line) => `${line.friendlyName} — ${line.formattedPhoneNumber}`;

const LoadingSkeleton = () => (
	<div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
		<div className="rounded-2xl border border-slate-200 bg-white p-4">
			<div className="mb-3 h-4 w-40 animate-pulse rounded bg-slate-200" />
			<div className="space-y-2">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="h-14 animate-pulse rounded-xl bg-slate-100" />
				))}
			</div>
		</div>
		<div className="rounded-2xl border border-slate-200 bg-white p-4">
			<div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
			<div className="mt-4 space-y-3">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="h-16 animate-pulse rounded-xl bg-slate-100" />
				))}
			</div>
		</div>
	</div>
);

const CommunicationsPrototype = () => {
	const [activeLineId, setActiveLineId] = useState(communicationLines[0].id);
	const [activeTab, setActiveTab] = useState(channelTabs[0]);
	const [activeThreadId, setActiveThreadId] = useState(inboxThreads[communicationLines[0].id][0]?.id);
	const [isSwitchingLine, setIsSwitchingLine] = useState(false);

	const activeLine = useMemo(
		() => communicationLines.find((line) => line.id === activeLineId) ?? communicationLines[0],
		[activeLineId],
	);

	const threadsForLine = useMemo(() => inboxThreads[activeLine.id] ?? [], [activeLine.id]);

	useEffect(() => {
		setActiveThreadId(threadsForLine[0]?.id ?? null);
	}, [activeLine.id, threadsForLine]);

	const onLineChange = (event) => {
		const nextLineId = event.target.value;
		if (nextLineId === activeLine.id) return;

		setIsSwitchingLine(true);
		window.setTimeout(() => {
			setActiveLineId(nextLineId);
			setIsSwitchingLine(false);
		}, 500);
	};

	const selectedThread = threadsForLine.find((thread) => thread.id === activeThreadId) ?? threadsForLine[0];

	return (
		<div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
			<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
				<div>
					<p className="text-sm text-slate-500">Myndy &gt; Communications</p>
					<h1 className="text-2xl font-semibold text-slate-900">Communications Inbox</h1>
				</div>
				<div className="flex flex-wrap gap-2">
					{channelTabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
								activeTab === tab
									? "border-slate-900 bg-slate-900 text-white"
									: "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
							}`}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			<div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
				<p className="mb-2 text-sm font-medium text-slate-600">Current Line</p>
				<select
					value={activeLine.id}
					onChange={onLineChange}
					className="mb-3 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800"
				>
					{communicationLines.map((line) => (
						<option key={line.id} value={line.id}>
							{formatLine(line)}
						</option>
					))}
				</select>
				<div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
					<p>
						<span className="font-medium text-slate-800">Ownership:</span> {activeLine.ownership}
					</p>
					<p>
						<span className="font-medium text-slate-800">Team:</span> {activeLine.assignment.team}
					</p>
					<p>
						<span className="font-medium text-slate-800">User:</span> {activeLine.assignment.user}
					</p>
					<p>
						<span className="font-medium text-slate-800">Email:</span> {activeLine.assignment.email}
					</p>
				</div>
				<div className="mt-3 flex flex-wrap gap-2">
					{["Add user", "Manage settings", "Copy phone number", "Mute this inbox"].map((action) => (
						<button
							key={action}
							className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
						>
							{action}
						</button>
					))}
				</div>
			</div>

			{isSwitchingLine ? (
				<LoadingSkeleton />
			) : (
				<div className="grid h-[58vh] grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
					<div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white">
						<div className="border-b border-slate-200 px-4 py-3">
							<p className="text-sm font-semibold text-slate-800">Inbox ({activeLine.inboxCount})</p>
							<p className="text-xs text-slate-500">Active Channel: {activeTab}</p>
						</div>
						<div className="space-y-2 overflow-y-auto p-2">
							{threadsForLine.map((thread) => (
								<button
									key={thread.id}
									onClick={() => setActiveThreadId(thread.id)}
									className={`w-full rounded-xl border p-3 text-left transition ${
										selectedThread?.id === thread.id
											? "border-slate-900 bg-slate-100"
											: "border-slate-200 hover:border-slate-400"
									}`}
								>
									<div className="mb-1 flex items-center justify-between">
										<p className="font-medium text-slate-900">{thread.name}</p>
										<p className="text-xs text-slate-500">{thread.time}</p>
									</div>
									<p className="truncate text-sm text-slate-600">{thread.preview}</p>
									<div className="mt-2 flex items-center justify-between text-xs">
										<span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">{thread.channel}</span>
										{thread.unread > 0 ? (
											<span className="rounded-full bg-slate-900 px-2 py-0.5 text-white">{thread.unread}</span>
										) : (
											<span className="text-slate-400">Read</span>
										)}
									</div>
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
				</div>

				<div className="flex min-h-0 flex-col rounded-[14px] border border-[#cad9ed] bg-white">
					<div className="flex items-center justify-between border-b border-[#d7e3f3] px-3.5 py-2.5">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dee9fb] text-xs font-bold text-[#2e4c77]">{(selectedThread?.name ?? "C").slice(0, 1)}</div>
							<div>
								<p className="text-sm font-semibold text-[#1f3658]">{selectedThread?.name ?? "Contact"}</p>
								<p className="text-[11px] text-[#7085a6]">{formatLine(activeLine)}</p>
							</div>
						</div>
						<div className="flex items-center gap-1.5">
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
									className={`rounded-[8px] border px-2 py-1 text-[10px] font-semibold ${activeChannel === channel ? "border-[#2d4f7f] bg-[#2d4f7f] text-white" : "border-[#d2dff0] text-[#395780]"}`}
									className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${activeChannel === channel ? "border-[#2d4e7f] bg-[#2d4e7f] text-white" : "border-[#d1dded] bg-white text-[#37557f]"}`}
								>
									{channel}
								</button>
							))}
							<CircleBtn>i</CircleBtn>
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto bg-[#f7faff] px-3.5 py-3">
						<div className="mx-auto max-w-[760px] space-y-2.5">
							{timeline.map((event) =>
								event.type === "call" ? (
									<div key={event.id} className="rounded-[12px] border border-[#d3e1f2] bg-white px-3 py-2.5">
										<p className="text-xs font-semibold text-[#233d62]">{event.title}</p>
										<p className="text-[11px] text-[#6f84a5]">{event.meta}</p>
										<p className="mt-0.5 text-[10px] text-[#8ea2bf]">{event.time}</p>
									</div>
								) : (
									<div key={event.id} className={`max-w-[72%] rounded-[14px] px-3 py-2 ${event.type === "out" ? "ml-auto bg-[#2d4f80] text-white" : "border border-[#d4e2f3] bg-white text-[#2f4a72]"}`}>
										<p className="text-xs leading-[1.45]">{event.body}</p>
										<p className={`mt-1 text-[10px] ${event.type === "out" ? "text-[#d0dcf2]" : "text-[#8ba0be]"}`}>{event.time}</p>
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

					<div className="border-t border-[#d7e3f3] px-3 py-2.5">
						<div className="flex items-center gap-1.5 rounded-[10px] border border-[#cad9ed] bg-[#f3f8ff] px-2 py-2">
							<CircleBtn>+</CircleBtn>
							<CircleBtn>☺</CircleBtn>
							<input readOnly value="Write a message" className="w-full bg-transparent text-xs text-[#6f84a5] outline-none" />
							<button className="rounded-[8px] bg-[#2d4f80] px-3 py-1 text-[11px] font-semibold text-white">Send</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
					<div className="border-t border-[#dbe6f5] bg-white px-4 py-2.5">
						<div className="flex items-center gap-2 rounded-xl border border-[#cad8ec] bg-[#f4f8ff] px-2.5 py-2">
							<Circle className="h-6 w-6">＋</Circle>
							<input readOnly value="Write a message..." className="w-full bg-transparent text-xs text-[#6f84a4] outline-none" />
							<button className="rounded-md bg-[#2d4e7f] px-3 py-1 text-[11px] font-semibold text-white">Send</button>
						</div>
					</div>
				</section>
			</div>
					<div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white">
						<div className="border-b border-slate-200 px-5 py-4">
							<p className="text-lg font-semibold text-slate-900">{selectedThread?.name ?? "No thread selected"}</p>
							<p className="text-sm text-slate-500">{formatLine(activeLine)}</p>
						</div>
						<div className="flex-1 space-y-3 overflow-y-auto p-5">
							{sampleConversation.map((message) => (
								<div
									key={`${selectedThread?.id}-${message.id}`}
									className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${
										message.sender === "agent"
											? "ml-auto bg-slate-900 text-white"
											: "bg-slate-100 text-slate-800"
									}`}
								>
									<p>{message.body}</p>
									<p className={`mt-1 text-[11px] ${message.sender === "agent" ? "text-slate-300" : "text-slate-500"}`}>
										{message.time}
									</p>
								</div>
							))}
						</div>
						<div className="border-t border-slate-200 p-4">
							<div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
								<input
									type="text"
									readOnly
									value="Type a message… (static prototype composer)"
									className="w-full bg-transparent text-sm text-slate-500 outline-none"
								/>
								<button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">Send</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommunicationsPrototype;
