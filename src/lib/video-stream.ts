/**
 * Blob origin that qualifies for streaming through our proxy.
 * Videos from this origin will be routed through /api/video-stream.
 */
const BLOB_ORIGIN = "https://5wwdmh3yjv6mnick.public.blob.vercel-storage.com";

/**
 * Returns a streamable video URL.
 *
 * - If the `src` points to the Vercel Blob CDN, it rewrites it to go through
 *   our `/api/video-stream` proxy which guarantees proper Range Request support.
 * - If the `src` is a local/relative path (e.g. `/videos/...`), it returns it
 *   unchanged since Next.js serves static assets with correct headers.
 *
 * @param src - The original video source URL
 * @returns   The URL to use in the `<video>` element
 */
export function getStreamUrl(src: string): string {
  if (src.startsWith(BLOB_ORIGIN)) {
    return `/api/video-stream?url=${encodeURIComponent(src)}`;
  }

  return src;
}
