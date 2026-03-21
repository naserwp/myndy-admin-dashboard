"use client";

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
