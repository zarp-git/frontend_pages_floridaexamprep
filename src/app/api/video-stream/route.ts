import { type NextRequest, NextResponse } from "next/server";

/**
 * Allowed origins for video streaming.
 * Only requests for videos hosted on these domains will be proxied.
 */
const ALLOWED_ORIGINS = [
  "https://storage.googleapis.com/my-first-project-0",
];

/**
 * GET /api/video-stream?url=<encoded-gcs-url>
 *
 * Proxies a video from Google Cloud Storage (or any allowed origin) to the client
 * with proper HTTP Range Request support so the browser can stream and seek.
 *
 * - Validates the URL against an allow-list to prevent open-proxy abuse.
 * - Forwards the Range header from the client to the upstream.
 * - Relays Content-Range, Content-Length, Content-Type, and Accept-Ranges.
 * - Streams the response body directly (no buffering) for low memory usage.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 },
    );
  }

  // Validate URL is from an allowed origin
  const isAllowed = ALLOWED_ORIGINS.some((origin) =>
    videoUrl.startsWith(origin),
  );

  if (!isAllowed) {
    return NextResponse.json(
      { error: "URL origin not allowed" },
      { status: 403 },
    );
  }

  try {
    // Forward the Range header from the client request (if present)
    const headers: HeadersInit = {};
    const rangeHeader = request.headers.get("range");
    if (rangeHeader) {
      headers["Range"] = rangeHeader;
    }

    const upstreamResponse = await fetch(videoUrl, { headers });

    if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
      return NextResponse.json(
        { error: "Failed to fetch video from upstream" },
        { status: upstreamResponse.status },
      );
    }

    // Build response headers for the client
    const responseHeaders = new Headers();

    const contentType =
      upstreamResponse.headers.get("content-type") || "video/mp4";
    responseHeaders.set("Content-Type", contentType);

    responseHeaders.set("Accept-Ranges", "bytes");

    const contentLength = upstreamResponse.headers.get("content-length");
    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    const contentRange = upstreamResponse.headers.get("content-range");
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }

    // Allow the browser to cache the video segments
    responseHeaders.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );

    // CORS - allow same-origin usage
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    // Stream the body directly without buffering
    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status, // 200 or 206
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[video-stream] Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error while streaming video" },
      { status: 500 },
    );
  }
}
