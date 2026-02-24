export default {
	title: "Professional Exam Preparation Services in Florida | Florida Exam Prep",
	blog_title: "Blog | Florida Exam Prep",
	description:
		"Florida Exam Prep provides expert exam preparation services in Florida. Transform your career with quality study materials and support.",
	keywords: "Florida Exam Prep, exam preparation, study materials, Florida exams, test prep, exam tutoring",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: process.env.NEXT_PUBLIC_SITE_URL,
		title: "Professional Exam Preparation Services in Florida | Florida Exam Prep",
		description:
			"Transform your career with Florida Exam Prep. Expert exam preparation services in Florida.",
		siteName: "Florida Exam Prep",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero-main.webp`,
				width: 1200,
				height: 630,
				alt: "Florida Exam Prep - Professional Exam Preparation Services in Florida",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Florida Exam Prep | Professional Exam Preparation Services in Florida",
		description:
			"Transform your career with Florida Exam Prep. Expert exam preparation services in Florida.",
		images: [
			`${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero-main.webp`,
		],
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
};
