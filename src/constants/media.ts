/**
 * Centralized media URL constants.
 *
 * All testimonial videos are hosted on Vercel Blob.
 * Blob storage base: https://5wwdmh3yjv6mnick.public.blob.vercel-storage.com
 */

const BLOB_BASE = "https://5wwdmh3yjv6mnick.public.blob.vercel-storage.com";
const BLOB_VIDEOS = `${BLOB_BASE}/videos/testimonials`;

export const TESTIMONIAL_VIDEOS = {
  VIDEO_1: `${BLOB_VIDEOS}/videostudant.mp4`,
  VIDEO_1B: `${BLOB_VIDEOS}/videostudanttwo.mp4`,
  VIDEO_2: `${BLOB_VIDEOS}/floridaexamprep_testimonial_video%202.mp4`,
  VIDEO_3: `${BLOB_VIDEOS}/floridaexamprep_testiominal_video%203.mp4`,
  VIDEO_4: `${BLOB_VIDEOS}/floridaexamprep_testiominal_video%204.mp4`,
  VIDEO_5: `${BLOB_VIDEOS}/floridaexamprep_testiominal_video%205.mp4`,
  VIDEO_6: `${BLOB_VIDEOS}/floridaexamprep_testiominal_video%206.mp4`,
} as const;

