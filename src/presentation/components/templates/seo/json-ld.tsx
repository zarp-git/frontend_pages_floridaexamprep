"use client";

import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export const JsonLd = ({ data, id = "json-ld" }: JsonLdProps) => {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Componente específico para FAQ
interface FAQJsonLdProps {
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
}

export const FAQJsonLd = ({ faq }: FAQJsonLdProps) => {
  // Validação: só renderiza se houver FAQs
  if (!faq || faq.length === 0) {
    return null;
  }

  // Validação adicional: verificar se todos os itens têm question e answer
  const validFaq = faq.filter(item => 
    item.question && 
    item.answer && 
    item.question.trim() !== '' && 
    item.answer.trim() !== ''
  );

  if (validFaq.length === 0) {
    return null;
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaq.map((item) => ({
      "@type": "Question",
      "name": item.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.trim()
      }
    }))
  };

  return <JsonLd data={faqStructuredData} id="faq-json-ld" />;
};

// Componente para dados da organização
export const OrganizationJsonLd = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://floridaexamprep.com";
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Florida Exam Prep",
    "description": "Professional exam preparation services in Florida.",
    "url": siteUrl,
    "logo": `${siteUrl}/images/svg/logo.svg`,
    "sameAs": [
      "https://www.instagram.com/floridaexamprep/",
      "https://www.facebook.com/floridaexamprep/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+1-407-818-7876",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "99 6th St SW Ste 109",
      "addressLocality": "Winter Haven",
      "addressRegion": "FL",
      "postalCode": "33880-7902",
      "addressCountry": "US"
    }
  };

  return <JsonLd data={organizationData} id="organization-json-ld" />;
};

// Componente para produto/serviço
export const ProductJsonLd = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://floridaexamprep.com";
  const productData = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Florida Exam Prep | Professional Exam Preparation Services",
		description:
			"Expert exam preparation services in Florida.",
		url: siteUrl,
		serviceType: "Education",
		areaServed: {
			"@type": "State",
			name: "Florida",
		},
		provider: {
			"@type": "LocalBusiness",
			name: "Florida Exam Prep",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.9",
			ratingCount: "150",
			bestRating: "5",
			worstRating: "1",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Exam Prep Services",
			itemListElement: [
				"Exam Preparation",
				"Study Materials",
				"Practice Tests",
				"Tutoring Services",
			],
		},
	};

  return <JsonLd data={productData} id="product-json-ld" />;
};

// Componente para breadcrumbs
export const BreadcrumbJsonLd = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={breadcrumbData} id="breadcrumb-json-ld" />;
};

// Componente para reviews/testimonials
export const ReviewJsonLd = () => {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Florida Exam Prep - Professional Exam Preparation Services",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Florida Exam Prep did an amazing job helping me prepare. Professional, on time, and the results exceeded my expectations!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "James R."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Great study materials and support. The team was very professional and the quality is outstanding."
      }
    ]
  };

  return <JsonLd data={reviewData} id="review-json-ld" />;
};
