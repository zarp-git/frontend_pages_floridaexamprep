/**
 * Centralized media URL constants.
 *
 * All videos are hosted on Google Cloud Storage (public bucket).
 *
 * GCS storage base: https://storage.googleapis.com/my-first-project-0/my-first-project-0
 */

const GCS_BASE = "https://storage.googleapis.com/my-first-project-0/my-first-project-0";
const GCS_HERO = `${GCS_BASE}/videos/hero`;
const GCS_TESTIMONIALS = `${GCS_BASE}/videos/testimonials`;

export const HERO_VIDEOS = {
  THUMBNAIL: `${GCS_HERO}/hero-video-thumbnail.mp4`,
} as const;

export const TESTIMONIAL_VIDEOS = {
  VIDEO_0: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-0.mp4`,
  VIDEO_1: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-1.mp4`,
  VIDEO_2: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-2.mp4`,
  VIDEO_3: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-3.mp4`,
  VIDEO_4: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-4.mp4`,
  VIDEO_5: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-5.mp4`,
  VIDEO_6: `${GCS_TESTIMONIALS}/floridaexamprep_testimonial_video-6.mp4`,
} as const;
