import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  
  // Skip middleware for maintenance page itself to avoid redirect loop
  if (request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next();
  }

  // Skip middleware for static assets
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (isMaintenanceMode) {
    // Optional: Whitelist IPs (uncomment and configure if needed)
    // const allowedIPs = process.env.MAINTENANCE_WHITELIST_IPS?.split(",") || [];
    // const clientIP = request.ip || request.headers.get("x-forwarded-for") || "";
    // if (allowedIPs.includes(clientIP)) {
    //   return NextResponse.next();
    // }

    // Rewrite to maintenance page (keeps URL but shows maintenance content)
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    
    const response = NextResponse.rewrite(url);
    
    // Set proper HTTP status code for maintenance
    response.headers.set("Retry-After", "3600"); // Retry after 1 hour
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
