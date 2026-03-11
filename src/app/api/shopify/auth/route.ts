import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Shopify OAuth Installation Flow - Step 1
 * Redirects to Shopify authorization page
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get("shop");

    if (!shop) {
      return NextResponse.json(
        { error: "Missing shop parameter" },
        { status: 400 }
      );
    }

    // Validate shop domain format
    const shopRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;
    if (!shopRegex.test(shop)) {
      return NextResponse.json(
        { error: "Invalid shop domain" },
        { status: 400 }
      );
    }

    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/shopify/auth/callback`;
    const scopes = "read_customers,read_inventory,read_orders,read_products,write_customers,write_draft_orders";
    
    // Generate state for CSRF protection
    const state = crypto.randomBytes(32).toString("hex");
    
    // Store state in cookie for validation in callback
    const response = NextResponse.redirect(
      `https://${shop}/admin/oauth/authorize?` +
        `client_id=${clientId}&` +
        `scope=${scopes}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `state=${state}`
    );

    response.cookies.set("shopify_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    return response;
  } catch (error) {
    console.error("Error initiating Shopify OAuth:", error);
    return NextResponse.json(
      { error: "Failed to initiate OAuth flow" },
      { status: 500 }
    );
  }
}
