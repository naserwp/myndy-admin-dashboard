import Link from "next/link";
import React from "react";

const Sidebar = () => {
	return (
		<div className="min-w-[180px] text-white">
			<div>
				<Link href={"/"}>LOGO</Link>
			</div>
			<div className="mt-10">
				<div className="flex flex-col text-lg font-medium gap-y-2">
					<Link href={"/admin"}>Dashboard</Link>
					<Link href={"/admin/conversations"}>conversations</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
