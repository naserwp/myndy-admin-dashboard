"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "react-toast-master";

const UserManagement = () => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const itemsPerPage = 20;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// const [conversationsLoaded, setConversationsLoaded] = useState(false);
	const [userId, setUserId] = useState("");
	const [email, setEmail] = useState("");
	const [searchEmail, setSearchEmail] = useState("");

	const [conversationDetails, setConversationDetails] = useState(null);
	const [conLoading, setConLoading] = useState(false);
	const [conError, setConError] = useState(null);

	const { toastMaster } = useToast();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setLoading(true);
	// 		setError(null);
	// 		try {
	// 			let url = `https://chat-agents.myndy.ai/conversations?page=${page}&limit=${itemsPerPage}`;
	// 			if (email) {
	// 				// Fetch userId from the email if provided
	// 				const userIdResponse = await fetch(`https://auth.myndy.ai/v1/test/${email}`);
	// 				if (!userIdResponse.ok) {
	// 					throw new Error("Failed to fetch userId");
	// 				}
	// 				const userIdData = await userIdResponse.json();
	// 				setUserId(userIdData.id); // Store the userId
	// 				// Add user_id to URL if email provided
	// 				if (userIdData.id) {
	// 					url += `&user_id=${userIdData.id}`;
	// 				}
	// 			} else {
	// 				setUserId(""); // Clear userId when email is not provided
	// 			}
	// 			const response = await fetch(url);
	// 			if (!response.ok) {
	// 				throw new Error("Failed to fetch conversations");
	// 			}
	// 			const data = await response.json();
	// 			setTotalCount(data.total_count);
	// 			// Replace data instead of appending for numbered pagination
	// 			setData(data.conversations);
	// 		} catch (err) {
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchData();
	// }, [email, page]);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				let url = `https://chat-agents.myndy.ai/conversations?page=${page}&limit=${itemsPerPage}`;
				if (searchEmail) {
					// Use searchEmail instead of email
					// Fetch userId from the email if provided
					const userIdResponse = await fetch(`https://auth.myndy.ai/v1/test/${searchEmail}`);
					if (!userIdResponse.ok) {
						throw new Error("Failed to fetch userId");
					}
					const userIdData = await userIdResponse.json();
					setUserId(userIdData.id); // Store the userId
					// Add user_id to URL if email provided
					if (userIdData.id) {
						url += `&user_id=${userIdData.id}`;
					}
				} else {
					setUserId(""); // Clear userId when email is not provided
				}
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch conversations");
				}
				const data = await response.json();
				setTotalCount(data.total_count);
				// Replace data instead of appending for numbered pagination
				setData(data.conversations);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [searchEmail, page]);

	// Pagination helper functions
	const totalPages = Math.ceil(totalCount / itemsPerPage);

	const generatePageNumbers = () => {
		const pages = [];
		const showEllipsis = totalPages > 7;

		if (!showEllipsis) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show ellipsis for more than 7 pages
			if (page <= 4) {
				// Show 1, 2, 3, 4, 5, ..., last
				for (let i = 1; i <= 5; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			} else if (page >= totalPages - 3) {
				// Show 1, ..., last-4, last-3, last-2, last-1, last
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - 4; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				// Show 1, ..., current-1, current, current+1, ..., last
				pages.push(1);
				pages.push("...");
				for (let i = page - 1; i <= page + 1; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
			setPage(newPage);
		}
	};

	const handleInputChange = (e) => {
		setEmail(e.target.value); // Only update input field value
	};

	const handleSearch = () => {
		setSearchEmail(email); // Set the search term
		setPage(1); // Reset to first page
		setData([]); // Clear existing data
	};

	const handleClearSearch = () => {
		setEmail("");
		setSearchEmail(""); // Clear search term
		setUserId("");
		setPage(1);
		setData([]);
	};

	// Handle Enter key press for search
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const copyUserId = (userId) => {
		navigator.clipboard
			.writeText(userId)
			.then(() => {
				toastMaster({
					type: "successDark",
					message: "User ID copied to clipboard!",
					bg: "glass",
					position: "bottomLeft",
					transition: "top",
				});
			})
			.catch((err) => {
				toastMaster({
					type: "error",
					message: `Failed to copy: ${err}`,
					bg: "glass",
					position: "bottomLeft",
					transition: "top",
				});
			});
	};

	const handleConversationClick = async (conversationId) => {
		setConLoading(true);
		setConError(null);

		try {
			const response = await fetch(`https://chat-agents.myndy.ai/conversations/${conversationId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch conversation details");
			}
			const data = await response.json();
			setConversationDetails(data);
		} catch (err) {
			setConError(err.message);
		} finally {
			setConLoading(false);
		}
	};

	return (
		<div className="h-[84vh] overflow-y-hidden">
			<div className="flex gap-x-4">
				<div className="h-full rounded-md overflow-hidden min-w-[400px]">
					<div className="space-y-2">
						<div className="rounded-[10px] bg-[#516586]/40 p-2">
							<p>total conversations: {totalCount} items</p>
							<p>loaded conversations: {data.length} items</p>
						</div>
						<div className="flex mb-4">
							<div className="flex items-center w-full">
								<input
									type="text"
									placeholder="Search by Email"
									value={email}
									onChange={handleInputChange}
									onKeyPress={handleKeyPress}
									className="flex-1 p-2 border rounded"
								/>
								<button
									onClick={handleSearch}
									className="px-4 py-2 ml-2 text-white bg-blue-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
									disabled={!email.trim() || loading}
								>
									Search
								</button>
								<button
									onClick={handleClearSearch}
									className="p-2 ml-2 text-white bg-red-500 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={!email}
								>
									Clear
								</button>
							</div>
						</div>
					</div>
					{loading ? (
						<div className="h-[700px] w-full flex items-center justify-center">
							<svg
								stroke="currentColor"
								fill="none"
								strokeWidth="0"
								viewBox="0 0 24 24"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
								className="animate-spin scale-200"
							>
								<path
									opacity="0.2"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
									fill="currentColor"
								></path>
								<path
									d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
									fill="currentColor"
								></path>
							</svg>
						</div>
					) : error ? (
						<p>Error: {error}</p>
					) : (
						<div className="flex flex-col h-full pr-2 gap-y-2">
							<div className="overflow-y-auto h-[64vh] flex flex-col pb-2 gap-y-2">
								{data.map((item, index) => (
									<div
										key={index}
										className="flex flex-col justify-start items-start rounded-[10px] bg-[#516586]/40 p-2 focus:outline-0"
									>
										<button
											onClick={() => copyUserId(item.user_id)}
											className="max-w-[35ch] truncate text-start whitespace-nowrap focus:outline-0 cursor-pointer"
											title={item.user_id}
										>
											User id: {item.user_id}
										</button>
										<button
											onClick={() => handleConversationClick(item.conversation_id)}
											className="mt-1 cursor-pointer focus:outline-0"
										>
											<p className="max-w-[30ch] capitalize truncate">
												lM: {item.last_message}
											</p>
											<div className="flex text-sm capitalize gap-x-2">
												<p>date: {item.updated_at.split("T")[0]}</p>
												<p>time: {item.updated_at.split("T")[1].split(".")[0]}</p>
											</div>
										</button>
									</div>
								))}
							</div>
						</div>
					)}
					{totalPages > 1 && (
						<div className="flex items-center justify-center gap-2 py-2 mt-4">
							{/* Previous button */}
							<button
								onClick={() => handlePageChange(page - 1)}
								disabled={page === 1}
								className={`px-3 py-1 rounded-md ${
									page === 1
										? "bg-gray-300 text-gray-500 cursor-not-allowed"
										: "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
								}`}
							>
								&lt;
							</button>

							{/* Page numbers */}
							{generatePageNumbers().map((pageNum, index) => (
								<button
									key={index}
									onClick={() => pageNum !== "..." && handlePageChange(pageNum)}
									disabled={pageNum === "..."}
									className={`px-3 py-1 rounded-md ${
										pageNum === page
											? "bg-blue-600 text-white"
											: pageNum === "..."
											? "bg-transparent text-gray-500 cursor-default"
											: "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
									}`}
								>
									{pageNum}
								</button>
							))}

							{/* Next button */}
							<button
								onClick={() => handlePageChange(page + 1)}
								disabled={page === totalPages}
								className={`px-3 py-1 rounded-md ${
									page === totalPages
										? "bg-gray-300 text-gray-500 cursor-not-allowed"
										: "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
								}`}
							>
								&gt;
							</button>
						</div>
					)}
				</div>
				<div className="w-full h-full">
					{conLoading ? (
						<div className="w-full h-full">
							<div className="flex justify-center items-center h-[700px]">
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth="0"
									viewBox="0 0 24 24"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
									className="animate-spin scale-200"
								>
									<path
										opacity="0.2"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
										fill="currentColor"
									></path>
									<path
										d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</div>
					) : conError ? (
						<p>Error: {conError}</p>
					) : conversationDetails ? (
						<div>
							<div className="px-4 py-1 text-black rounded-lg bg-gray-900/20 h-fit">
								<p className="capitalize">
									conversation id: {conversationDetails?.conversation_id}
								</p>
								<p className="capitalize">
									collection id: {conversationDetails?.collection_ids}
								</p>
								<p className="capitalize">user id: {conversationDetails?.user_id}</p>
								<p className="capitalize">
									aI builder name: {conversationDetails?.aiBuilder_name}
								</p>
							</div>
							<div className="overflow-y-auto h-[73vh] flex flex-col px-4">
								{conversationDetails.messages.map((item, index) => (
									<div
										key={index}
										className="my-4"
									>
										<div
											className={`flex ${
												item.role === "ai" ? "justify-end" : "justify-start"
											} mb-2`}
										>
											<div
												className={`p-2 max-w-[70%] text-black ${
													item.role === "ai" ? "bg-blue-200" : "bg-gray-300"
												} rounded-lg`}
											>
												<p className="pb-1">
													{item.role === "human" ? (
														<>
															<svg
																stroke="currentColor"
																fill="currentColor"
																strokeWidth="0"
																viewBox="0 0 512 512"
																height="1em"
																width="1em"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
															</svg>
														</>
													) : (
														<>
															<svg
																stroke="currentColor"
																fill="currentColor"
																strokeWidth="0"
																viewBox="0 0 640 512"
																height="1em"
																width="1em"
																xmlns="http://www.w3.org/2000/svg"
																className="scale-[1.2]"
															>
																<path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z"></path>
															</svg>
														</>
													)}
												</p>
												<p>{item.content}</p>
												<span className="text-sm text-gray-500">
													{new Date(item.timestamp).toLocaleTimeString()}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="w-full h-[700px] flex items-center justify-center">
							<p>Select a conversation to view details</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserManagement;
