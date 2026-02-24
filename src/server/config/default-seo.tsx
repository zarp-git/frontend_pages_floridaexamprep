export default {
	title: "Professional Paver Services in Central Florida | AllBrick Pavers",
	blog_title: "Blog | AllBrick Pavers",
	description:
		"AllBrick Pavers provides expert paver installation, repair, and maintenance services in Central Florida. Transform your outdoor space with quality craftsmanship.",
	keywords: "AllBrick Pavers, paver installation, paver repair, paver maintenance, Central Florida pavers, driveway pavers, patio pavers, pool deck pavers",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: process.env.NEXT_PUBLIC_SITE_URL,
		title: "Professional Paver Services in Central Florida | AllBrick Pavers",
		description:
			"Transform your outdoor space with AllBrick Pavers. Expert paver installation, repair, and maintenance in Winter Haven, Lakeland, and Central Florida.",
		siteName: "AllBrick Pavers",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero-main.webp`,
				width: 1200,
				height: 630,
				alt: "AllBrick Pavers - Professional Paver Services in Central Florida",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "AllBrick Pavers | Professional Paver Services in Central Florida",
		description:
			"Transform your outdoor space with AllBrick Pavers. Expert paver installation, repair, and maintenance in Winter Haven, Lakeland, and Central Florida.",
		images: [
			`${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero-main.webp`,
		],
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
};
