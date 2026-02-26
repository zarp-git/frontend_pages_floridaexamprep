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
	facebook: "https://www.facebook.com/people/Florida-Exam-Prep/61577610429350/",
	youtube: "https://www.youtube.com/@Cruzvinci",
	whatsapp: "https://wa.me/14436956218",
	googleMaps: "https://www.google.com/maps/place/Florida+Exam+Prep",
} as const;

// Contact information used across the site
export const CONTACT = {
	email: "contact@floridaexamprep.com",
	phoneDisplay: "+1 443 695-6218",
	phoneHref: "tel:+14436956218",
	phoneRaw: "+14436956218",
	hours: "Mon-Sat: 9:00 AM - 5:00 PM",
} as const;

// CTA (Call to Action) — Single Source of Truth for all landing-page sections
export const CTA_TEXT = "GET THAT APPROVAL RIGHT WAY" as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = "fep_consent_choice_v1" as const;
