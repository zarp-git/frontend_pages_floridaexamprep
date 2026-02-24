"use client";

import { JsonLd } from "./json-ld";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://allbrickpavers.com";

export const ArticleJsonLd = () => {
  const articleData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline:
			"AllBrick Pavers: Expert Paver Installation and Outdoor Living in Central Florida",
		description:
			"Discover how AllBrick Pavers transforms outdoor spaces across Central Florida with professional paver installation, repair, and maintenance services. Serving Winter Haven, Lakeland, and surrounding areas.",
		image: [
			`${SITE_URL}/images/sections-images/patio-pavers-1-after-1.webp`,
			`${SITE_URL}/images/sections-images/driveway-pavers-2-after.webp`,
		],
		author: {
			"@type": "Organization",
			name: "AllBrick Pavers",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Organization",
			name: "AllBrick Pavers",
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
			"allbrick pavers",
			"paver installation central florida",
			"driveway pavers",
			"patio pavers",
			"pool deck pavers",
			"paver repair",
			"paver maintenance",
			"winter haven pavers",
			"lakeland pavers",
			"outdoor living florida",
		],
		articleSection: "Home Improvement",
		wordCount: 2000,
		inLanguage: "en-US",
	};

  return <JsonLd data={articleData} id="article-json-ld" />;
};

// Componente para dados estruturados de serviço local
export const LocalBusinessJsonLd = () => {
  const localBusinessData = {
		"@context": "https://schema.org",
		"@type": "HomeAndConstructionBusiness",
		"@id": `${SITE_URL}/#business`,
		name: "AllBrick Pavers",
		description:
			"Family-owned paver installation, repair, and maintenance company serving Central Florida homeowners. Specializing in driveways, patios, pool decks, walkways, and fire pits with quality craftsmanship since 2018.",
		url: SITE_URL,
		telephone: "+1-407-818-7876",
		email: "allbrickpaving@gmail.com",
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
		priceRange: "$$",
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
			name: "Paver Services",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Paver Installation",
						description:
							"Professional paver installation for driveways, patios, pool decks, walkways, and fire pits using high-quality materials.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Paver Repair",
						description:
							"Expert repair services for sunken, cracked, or damaged pavers to restore your outdoor surfaces.",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Paver Maintenance",
						description:
							"Comprehensive paver maintenance plans including cleaning, sealing, and ongoing care to keep your outdoor space looking its best.",
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
		name: "AllBrick Pavers",
		alternateName: "AllBrick Pavers",
		url: SITE_URL,
		description:
			"Transform your outdoor space with AllBrick Pavers. Professional paver installation, repair, and maintenance services in Central Florida. Serving Winter Haven, Lakeland, Davenport, and surrounding areas since 2018.",
		inLanguage: "en-US",
		copyrightYear: 2025,
		copyrightHolder: {
			"@type": "Organization",
			name: "AllBrick Pavers",
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
			name: "AllBrick Pavers",
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/images/svg/logo.svg`,
			},
		},
	};

  return <JsonLd data={webSiteData} id="website-json-ld" />;
};
