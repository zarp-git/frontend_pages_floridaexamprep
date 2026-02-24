export * from "./footer";
export * from "./navigation";
export * from "./services";
export * from "./locations";

// Site configuration
export const SITE_CONFIG = {
	name: "Florida Exam Prep",
	description:
		"Florida Exam Prep - Your exam preparation solution.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://floridaexamprep.com",
	logo: "/logo.svg",
} as const;

// Social media links
export const SOCIAL_LINKS = {
	instagram: "https://www.instagram.com/floridaexamprep/",
	facebook:
		"https://www.facebook.com/floridaexamprep/",
	googleMaps: "https://www.google.com/maps/place/Florida+Exam+Prep",
} as const;

// Contact information used across the site
export const CONTACT = {
	email: "contact@floridaexamprep.com",
	phoneDisplay: "+1 407-818-7876",
	phoneHref: "tel:+14078187876",
	phoneRaw: "+14078187876",
	hours: "Mon-Sat: 9:00 AM - 5:00 PM",
} as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = "fep_consent_choice_v1" as const;
