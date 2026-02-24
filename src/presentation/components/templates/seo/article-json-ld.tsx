"use client";

import { JsonLd } from "./json-ld";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://floridaexamprep.com";

export const ArticleJsonLd = () => {
  const articleData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline:
			"Florida Exam Prep: Expert Exam Preparation Services in Florida",
		description:
			"Discover how Florida Exam Prep transforms exam preparation across Florida with professional study materials, tutoring, and practice tests. Serving Winter Haven, Lakeland, and surrounding areas.",
		image: [
			`${SITE_URL}/images/sections-images/patio-pavers-1-after-1.webp`,
			`${SITE_URL}/images/sections-images/driveway-pavers-2-after.webp`,
		],
		author: {
			"@type": "Organization",
			name: "Florida Exam Prep",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Organization",
			name: "Florida Exam Prep",
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/images/svg/logo.svg`,
			},
		},
		datePublished: "2025-01-01",
		dateModified: "2026-02-14",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": SITE_URL,
		},
		keywords: [
			"florida exam prep",
			"exam preparation florida",
			"study materials",
			"practice tests",
			"exam tutoring",
			"test preparation",
			"winter haven exam prep",
			"lakeland exam prep",
			"florida education",
		],
		articleSection: "Education",
		wordCount: 2000,
		inLanguage: "en-US",
	};

  return <JsonLd data={articleData} id="article-json-ld" />;
};

// Componente para dados estruturados de serviço local
export const LocalBusinessJsonLd = () => {
  const localBusinessData = {
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		"@id": `${SITE_URL}/#business`,
		name: "Florida Exam Prep",
		description:
			"Professional exam preparation services serving Florida students and professionals. Specializing in study materials, practice tests, tutoring, and comprehensive exam preparation since 2018.",
		url: SITE_URL,
		telephone: "+1-407-818-7876",
		email: "contact@floridaexamprep.com",
		address: {
			"@type": "PostalAddress",
			streetAddress: "99 6th St SW Ste 109",
			addressLocality: "Winter Haven",
			addressRegion: "FL",
			postalCode: "33880-7902",
			addressCountry: "US",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "28.0222",
			longitude: "-81.7329",
		},
		openingHours: "Mo-Sa 09:00-17:00",
		priceRange: "$",
		paymentAccepted: "Credit Card, Debit Card, Cash, Check",
		currenciesAccepted: "USD",
		areaServed: [
			{ "@type": "City", name: "Winter Haven" },
			{ "@type": "City", name: "Lakeland" },
			{ "@type": "City", name: "Haines City" },
			{ "@type": "City", name: "Davenport" },
			{ "@type": "City", name: "Auburndale" },
			{ "@type": "City", name: "Horizon West" },
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Exam Prep Services",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Exam Preparation",
						description:
							"Professional exam preparation services with comprehensive study materials and expert guidance.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Tutoring Services",
						description:
							"Expert tutoring services to help you prepare for your exams with personalized instruction.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Practice Tests",
						description:
							"Comprehensive practice tests and study materials to ensure you're fully prepared for exam day.",
					},
				},
			],
		},
	};

  return <JsonLd data={localBusinessData} id="local-business-json-ld" />;
};

// Componente para dados estruturados de WebSite
export const WebSiteJsonLd = () => {
  const webSiteData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Florida Exam Prep",
		alternateName: "Florida Exam Prep",
		url: SITE_URL,
		description:
			"Transform your career with Florida Exam Prep. Professional exam preparation services in Florida. Serving Winter Haven, Lakeland, Davenport, and surrounding areas since 2018.",
		inLanguage: "en-US",
		copyrightYear: 2025,
		copyrightHolder: {
			"@type": "Organization",
			name: "Florida Exam Prep",
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "Florida Exam Prep",
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/images/svg/logo.svg`,
			},
		},
	};

  return <JsonLd data={webSiteData} id="website-json-ld" />;
};
