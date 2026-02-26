"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiMapPinLine,
  RiTimeLine,
  RiPhoneLine,
  RiStarLine,
} from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CurrentYear from "@/presentation/components/atoms/CurrentYear";
import {
  FOOTER_COMPANY_INFO,
  FOOTER_LOCATIONS,
  FOOTER_COMPANY_LINKS,
  FOOTER_SERVICES,
  FOOTER_LEGAL_LINKS,
} from "@/constants/footer";
import { SOCIAL_LINKS } from "@/constants";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";
import { useLeadModal } from "@/hooks/use-lead-modal";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";

export type FooterVariant = "default" | "simplified";

interface FooterProps {
  variant?: FooterVariant;
  navLinks?: { label: string; href: string }[];
}

const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Allbrick+Pavers&t=&z=9&ie=UTF8&iwloc=&output=embed";

export default function Footer({ variant = "default" }: FooterProps) {
  const { openModal } = useLeadModal();
  const { openModal: openMaintenanceModal } = useMaintenanceModal();
  if (variant === "simplified") {
    return (
      <footer className="w-full bg-black border-t border-gray-900">
        <div className="section-container py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm md:text-base font-normal font-rubik leading-5">
            AllBrick Pavers &copy; Copyright <CurrentYear /> - All Rights
            Reserved.
          </p>
          <Link
            href="https://www.zarpstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-4">
              <Link href="https://www.zarpstudio.com">
                <span className="text-gray-500 text-sm md:text-base font-normal font-rubik underline leading-5">
                  Developed and Maintained by
                </span>
              </Link>

              <Image
                src="/images/brands/zarp-logomark.svg"
                alt="Zarp Studio"
                width={83}
                height={25}
                className="h-6 w-auto"
              />
            </div>
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full">
      {/* ── Main Footer Section ── */}
      <div className="bg-white py-8 lg:py-16 w-full flex flex-col items-center gap-6 lg:gap-12">
        <div className="section-container flex flex-col items-center gap-6 sm:gap-8">
          {/* ── Top Card (bordered) ── */}
          <div className="w-full rounded-[10px] border border-secondary overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Column · Business Info */}
              <div className="flex-1 px-5 sm:px-8 md:px-10 lg:px-14 py-8 md:py-12 lg:py-16 border-b md:border-b-0 md:border-r border-secondary">
                <div className="flex flex-col gap-6">
                  <CompanyLogo size="xl" />

                  <p className="text-gray-700 text-base font-normal font-rubik leading-6">
                    {FOOTER_COMPANY_INFO.tagline}
                  </p>

                  <address
                    className="flex flex-col gap-3 not-italic"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <div className="flex items-center gap-2.5">
                      <RiMapPinLine
                        className="w-5 h-5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-700 text-lg font-bold font-red-hat uppercase leading-4 tracking-tight">
                        {FOOTER_COMPANY_INFO.address.label}
                      </span>
                    </div>
                    <p
                      className="text-gray-700 text-sm font-normal font-rubik leading-5"
                      itemProp="streetAddress"
                    >
                      {FOOTER_COMPANY_INFO.address.street}
                    </p>
                  </address>
                </div>
              </div>

              {/* Right Column · Contact & Map */}
              <div className="flex-1 px-5 sm:px-8 md:px-10 lg:px-14 py-8 md:py-12 lg:py-16 flex flex-col md:flex-row justify-between items-start gap-6 lg:gap-12">
                {/* Contact Us */}
                <div className="flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-bold font-red-hat uppercase leading-4 tracking-tight">
                      CONTACT US NOW
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>

                  <div className="w-56 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RiTimeLine className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-gray-700 text-xs font-rubik">
                        <span className="font-medium">FROM MON TO SAT</span>
                        <span className="font-bold"> : </span>
                        <span className="font-normal">9AM - 5PM</span>
                      </p>
                    </div>

                    <Link
                      href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}
                      className="text-neutral-600 text-2xl font-semibold font-rubik leading-5 hover:text-primary transition-colors"
                    >
                      {FOOTER_COMPANY_INFO.contact.phoneDisplay}
                    </Link>
                  </div>

                  <Button
                    variant="brick"
                    size="lg"
                    className="w-full h-10 px-5 py-4 rounded-lg flex justify-between items-center"
                    onClick={openModal}
                  >
                    <span className="uppercase">CALL US NOW</span>
                    <RiPhoneLine className="w-5 h-5" />
                  </Button>
                </div>

                {/* Serving Central Florida · Map */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-bold font-red-hat uppercase leading-4 tracking-tight">
                      Serving Central Florida
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>

                  <iframe
                    src={GOOGLE_MAPS_EMBED_URL}
                    className="w-full md:w-72 h-44 rounded-[10px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AllBrick Pavers location on Google Maps"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Section · Navigation Links ── */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 lg:gap-20">
            {/* Link Columns */}
            <nav
              aria-label="Footer Directory"
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-16"
            >
              {/* Company */}
              <FooterLinkColumn title="COMPANY" links={FOOTER_COMPANY_LINKS} onLinkClick={openMaintenanceModal} />

              {/* Locations */}
              <FooterLinkColumn title="LOCATIONS" links={FOOTER_LOCATIONS} onLinkClick={openMaintenanceModal} />

              {/* Services */}
              <FooterLinkColumn title="SERVICES" links={FOOTER_SERVICES} onLinkClick={openMaintenanceModal} />

              {/* Legal */}
              <FooterLinkColumn title="LEGAL" links={FOOTER_LEGAL_LINKS} onLinkClick={openMaintenanceModal} />
            </nav>

            {/* Find Us On */}
            <div className="w-full lg:w-60 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-lg font-bold font-red-hat uppercase leading-4 tracking-tight">
                  FIND US ON
                </h3>
                <div className="w-10 h-0.5 bg-primary rounded-lg" />
              </div>

              {/* Social Icons */}
              <ul className="flex items-center gap-6 list-none m-0 p-0">
                <li>
                  <Link
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="transition-transform hover:scale-110 block"
                  >
                    <Image
                      src="/images/brands/instagram-icon.svg"
                      alt="Instagram"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="transition-transform hover:scale-110 block"
                  >
                    <Image
                      src="/images/brands/facebook-icon.svg"
                      alt="Facebook"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on YouTube"
                    className="transition-transform hover:scale-110 block"
                  >
                    <Image
                      src="/images/svg/youtubeicon.svg"
                      alt="YouTube"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="transition-transform hover:scale-110 block"
                  >
                    <Image
                      src="/images/svg/whatsapp-icon.svg"
                      alt="WhatsApp"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={SOCIAL_LINKS.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Find us on Google Maps"
                    className="transition-transform hover:scale-110 block"
                  >
                    <Image
                      src="/images/brands/google-maps-icon.svg"
                      alt="Google Maps"
                      width={28}
                      height={40}
                      className="w-7 h-10"
                    />
                  </Link>
                </li>
              </ul>

              {/* Leave a Review */}
              <Button
                variant="default"
                size="lg"
                className="w-full h-10 px-5 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center"
                asChild
              >
                <Link
                  href={SOCIAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="uppercase text-white text-base font-medium font-rubik">
                    LEAVE US A REVIEW
                  </span>
                  <RiStarLine className="w-5 h-5 text-white" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="w-full py-5 lg:py-8 bg-black border-t border-gray-900">
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-normal font-rubik leading-5 text-center sm:text-left">
            AllBrick Pavers &copy; Copyright <CurrentYear /> - All Rights
            Reserved.
          </p>
          <div className="flex-1 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-2 sm:gap-4">
            <span className="text-gray-500 text-xs sm:text-sm md:text-base font-normal font-rubik underline leading-5">
              Developed and Maintained by
            </span>
            <Link
              href="https://www.zarpstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/brands/zarp-logomark.svg"
                alt="Zarp Studio"
                width={83}
                height={25}
                className="h-6 w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Reusable footer link column ── */
interface FooterLinkColumnProps {
  title: string;
  links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
  onLinkClick: () => void;
}

function FooterLinkColumn({ title, links, onLinkClick }: FooterLinkColumnProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/learning-center" || href === "/tools/design-visualizer" || href === "/tools/cost-calculator") {
      e.preventDefault();
      onLinkClick();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-800 text-lg font-bold font-red-hat uppercase leading-4 tracking-tight">
          {title}
        </h3>
        <div className="w-10 h-0.5 bg-primary rounded-lg" />
      </div>
      <ul className="flex flex-col gap-4 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
