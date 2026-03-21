export const communicationLines = [
	{
		id: "line_1",
		phoneNumber: "+12486022555",
		formattedPhoneNumber: "(248) 602-2555",
		friendlyName: "Red Spectrum Main",
		lineType: "shared",
		assignedUsers: [
			{ id: "u1", name: "Irish", email: "irish@theredspectrum.com" },
			{ id: "u2", name: "Support Admin", email: "clientsupport@theredspectrum.com" },
		],
		assignedTeam: { id: "t1", name: "Red Spectrum Support" },
		relatedEmail: "clientsupport@theredspectrum.com",
		isMuted: false,
		isActive: true,
	},
	{
		id: "line_2",
		phoneNumber: "+12495591979",
		formattedPhoneNumber: "(249) 559-1979",
		friendlyName: "Alternative Number RS",
		lineType: "team",
		assignedUsers: [{ id: "u3", name: "Sales Rep", email: "sales@theredspectrum.com" }],
		assignedTeam: { id: "t2", name: "Sales Team" },
		relatedEmail: "sales@theredspectrum.com",
		isMuted: false,
		isActive: true,
	},
	{
		id: "line_3",
		phoneNumber: "+12482788500",
		formattedPhoneNumber: "(248) 278-8500",
		friendlyName: "Red Spectrum Irish",
		lineType: "personal",
		assignedUsers: [{ id: "u4", name: "Irish", email: "irish@theredspectrum.com" }],
		assignedTeam: null,
		relatedEmail: "irish@theredspectrum.com",
		isMuted: false,
		isActive: true,
	},
	{
		id: "line_4",
		phoneNumber: "+12487205323",
		formattedPhoneNumber: "(248) 720-5323",
		friendlyName: "Account Exec",
		lineType: "role_based",
		assignedUsers: [{ id: "u5", name: "Account Executive", email: "ae@theredspectrum.com" }],
		assignedTeam: { id: "t3", name: "Accounts" },
		relatedEmail: "accounts@theredspectrum.com",
		isMuted: true,
		isActive: true,
	},
];

export const messageChannels = ["SMS", "Widget", "WhatsApp", "Email", "Call"];

export const inboxThreadsByLine = {
	line_1: [
		{ id: "th_1", name: "Jordan", phone: "(248) 111-1100", preview: "Thanks for confirming the install window.", at: "11:42 AM", badge: "SMS", unread: 2 },
		{ id: "th_2", name: "Kelly", phone: "(248) 999-4420", preview: "Incoming call missed • 4 min", at: "10:18 AM", badge: "Call", unread: 0 },
		{ id: "th_3", name: "Website Visitor", phone: "widget", preview: "Can someone call me about bundle pricing?", at: "Yesterday", badge: "Widget", unread: 0 },
	],
	line_2: [
		{ id: "th_4", name: "New Lead", phone: "(249) 300-1000", preview: "Please share pricing sheet via email.", at: "9:14 AM", badge: "Email", unread: 1 },
		{ id: "th_5", name: "Tim R.", phone: "(249) 888-1200", preview: "Call completed • 7 min", at: "Yesterday", badge: "Call", unread: 0 },
	],
	line_3: [
		{ id: "th_6", name: "Niamh", phone: "(248) 540-9120", preview: "I can be available after 3:30.", at: "8:55 AM", badge: "SMS", unread: 0 },
		{ id: "th_7", name: "Inbound WhatsApp", phone: "+353 89 200 1800", preview: "Document received, thank you.", at: "Thu", badge: "WhatsApp", unread: 0 },
	],
	line_4: [
		{ id: "th_8", name: "Strategic Account", phone: "(248) 720-9000", preview: "Need AE follow-up by today.", at: "12:01 PM", badge: "Call", unread: 3 },
		{ id: "th_9", name: "Accounts Mailbox", phone: "accounts@theredspectrum.com", preview: "Contract redline attached.", at: "Yesterday", badge: "Email", unread: 0 },
	],
};

export const timelineByThread = {
	default: [
		{ id: "e1", type: "call", title: "Incoming call", meta: "Answered by Irish • 3m 48s", time: "10:14 AM" },
		{ id: "e2", type: "in", body: "Hi! Can you confirm if installation is still tomorrow?", time: "10:23 AM" },
		{ id: "e3", type: "out", body: "Yes, you're all set for tomorrow at 2:00 PM.", time: "10:25 AM" },
		{ id: "e4", type: "in", body: "Perfect. Please text me when your team is on the way.", time: "10:26 AM" },
	],
};

export const utilityIcons = ["search", "book", "archive", "star", "label", "more"];
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
