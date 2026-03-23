"use client";

import { useMemo, useState } from "react";
import { communicationLines, inboxThreadsByLine, messageChannels, timelineByThread, utilityIcons } from "@/data/communicationsMock";

const iconMap = {
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
							{messageChannels.map((channel) => (
								<button
									key={channel}
									onClick={() => setActiveChannel(channel)}
									className={`rounded-[8px] border px-2 py-1 text-[10px] font-semibold ${activeChannel === channel ? "border-[#2d4f7f] bg-[#2d4f7f] text-white" : "border-[#d2dff0] text-[#395780]"}`}
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
