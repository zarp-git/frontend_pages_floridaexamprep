export * from "./footer";
export * from "./navigation";
export * from "./services";
export * from "./locations";

// Site configuration
export const SITE_CONFIG = {
	name: "AllBrick Pavers",
	description:
		"AllBrick Pavers - Your paving solution.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://allbrickpavers.com",
	logo: "/logo.svg",
} as const;

// Social media links
export const SOCIAL_LINKS = {
	instagram: "https://www.instagram.com/allbrickpavers/",
	facebook:
		"https://www.facebook.com/p/AllBrick-Pavers-61552914309792/",
	googleMaps: "https://www.google.com/maps/place/Allbrick+Pavers/@28.2690176,-82.2111262,8.88z/data=!4m6!3m5!1s0x4065b4dc4ae8f935:0xbc9b75cb581eee47!8m2!3d28.0216089!4d-81.7333756!16s%2Fg%2F11vjn_2b_c?hl=en&entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
} as const;

// Contact information used across the site
export const CONTACT = {
	email: "allbrickpaving@gmail.com",
	phoneDisplay: "+1 407-818-7876",
	phoneHref: "tel:+14078187876",
	phoneRaw: "+14078187876",
	hours: "Mon-Sat: 9:00 AM - 5:00 PM",
} as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = "abp_consent_choice_v1" as const;
