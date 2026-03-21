"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { MantineProvider } from "@mantine/core";
import { ToastProvider } from "react-toast-master";

const Layout = ({ children }) => {
	return (
		<div className="bg-white h-screen p-4 sm:p-6">
			<MantineProvider>
				<ToastProvider>
					<div className="bg-[#516586] rounded-[10px] sm:rounded-[22px] p-3 sm:p-6 w-full h-full sm:flex items-stretch">
						<Sidebar />
						<div className="bg-[#EDF7FF] p-4 sm:p-6 w-full h-full rounded-[10px] sm:rounded-[22px] overflow-x-hidden">
							{children}
						</div>
					</div>
				</ToastProvider>
			</MantineProvider>
		</div>
	);
};

export default Layout;
