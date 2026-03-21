export const communicationLines = [
	{
		id: "red-spectrum-main",
		friendlyName: "Red Spectrum Main",
		formattedPhoneNumber: "(248) 602-2555",
		ownership: "Personal",
		assignment: {
			team: "Sales Ops",
			user: "Avery Collins",
			email: "avery.collins@myndy.com",
		},
		inboxCount: 5,
	},
	{
		id: "alternative-number-rs",
		friendlyName: "Alternative Number RS",
		formattedPhoneNumber: "(249) 559-1979",
		ownership: "Shared",
		assignment: {
			team: "Red Spectrum",
			user: "Jordan West",
			email: "jordan.west@myndy.com",
		},
		inboxCount: 3,
	},
	{
		id: "red-spectrum-irish",
		friendlyName: "Red Spectrum Irish",
		formattedPhoneNumber: "(248) 278-8500",
		ownership: "Team",
		assignment: {
			team: "International",
			user: "Priya Nair",
			email: "priya.nair@myndy.com",
		},
		inboxCount: 2,
	},
	{
		id: "account-exec",
		friendlyName: "Account Exec",
		formattedPhoneNumber: "(248) 720-5323",
		ownership: "Role-based",
		assignment: {
			team: "Account Executive",
			user: "Rotation Queue",
			email: "ae-queue@myndy.com",
		},
		inboxCount: 4,
	},
];

export const channelTabs = ["SMS", "Widget", "WhatsApp", "Email", "Call"];

export const inboxThreads = {
	"red-spectrum-main": [
		{ id: "t1", name: "Morgan Lee", preview: "Can we move the install to Tuesday?", time: "9:42 AM", unread: 2, channel: "SMS" },
		{ id: "t2", name: "Casey C.", preview: "Widget request submitted with new details.", time: "8:10 AM", unread: 0, channel: "Widget" },
		{ id: "t3", name: "Support Queue", preview: "Lead assigned from website form.", time: "Yesterday", unread: 0, channel: "Email" },
	],
	"alternative-number-rs": [
		{ id: "t4", name: "Sam Delgado", preview: "Please send invoice PDF again.", time: "11:23 AM", unread: 1, channel: "SMS" },
		{ id: "t5", name: "Kathryn Mills", preview: "Thanks for the call, I will confirm by EOD.", time: "Yesterday", unread: 0, channel: "Call" },
	],
	"red-spectrum-irish": [
		{ id: "t6", name: "Niamh O'Brien", preview: "Widget chat escalated to communications.", time: "7:01 AM", unread: 0, channel: "Widget" },
		{ id: "t7", name: "Dublin Retail", preview: "WhatsApp confirmation received.", time: "Thu", unread: 0, channel: "WhatsApp" },
	],
	"account-exec": [
		{ id: "t8", name: "Enterprise Lead", preview: "Can someone from AE call me this afternoon?", time: "10:15 AM", unread: 3, channel: "Call" },
		{ id: "t9", name: "Ana J.", preview: "Email thread synced into inbox.", time: "Yesterday", unread: 0, channel: "Email" },
	],
};

export const sampleConversation = [
	{ id: "m1", sender: "contact", body: "Hey team, can I get an updated quote for this week?", time: "9:38 AM" },
	{ id: "m2", sender: "agent", body: "Absolutely — I can send that over today. Any changes from last month?", time: "9:40 AM" },
	{ id: "m3", sender: "contact", body: "Yes, please add onboarding for 3 new users.", time: "9:41 AM" },
	{ id: "m4", sender: "agent", body: "Perfect, I have everything I need. I will share final pricing shortly.", time: "9:44 AM" },
];
