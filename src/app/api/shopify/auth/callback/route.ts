import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Shopify OAuth Installation Flow - Step 2
 * Handles the callback from Shopify after authorization
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const hmac = searchParams.get("hmac");
    const shop = searchParams.get("shop");
    const state = searchParams.get("state");
    const host = searchParams.get("host");

    // Validate required parameters
    if (!code || !hmac || !shop || !state) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Verify state for CSRF protection
    const storedState = req.cookies.get("shopify_oauth_state")?.value;
    if (!storedState || storedState !== state) {
      return NextResponse.json(
        { error: "Invalid state parameter" },
        { status: 403 }
      );
    }

    // Verify HMAC signature
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
    if (!clientSecret) {
      throw new Error("SHOPIFY_CLIENT_SECRET not configured");
    }

    const params = new URLSearchParams(searchParams);
    params.delete("hmac");
    const message = params.toString();
    
    const generatedHash = crypto
      .createHmac("sha256", clientSecret)
      .update(message)
      .digest("hex");

    if (generatedHash !== hmac) {
      return NextResponse.json(
        { error: "Invalid HMAC signature" },
        { status: 403 }
      );
    }

    // Exchange code for access token
    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const tokenResponse = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Token exchange failed:", errorData);
      return NextResponse.json(
        { error: "Failed to exchange authorization code" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // TODO: Store access token securely in database
    // For now, log it (in production, save to database)
    console.log("=".repeat(80));
    console.log("SHOPIFY APP INSTALLED SUCCESSFULLY");
    console.log("=".repeat(80));
    console.log("Shop:", shop);
    console.log("Access Token:", accessToken);
    console.log("Scopes:", tokenData.scope);
    console.log("=".repeat(80));
    console.log("Add this to your .env.local:");
    console.log(`SHOPIFY_ADMIN_API_TOKEN=${accessToken}`);
    console.log(`SHOPIFY_STORE_DOMAIN=${shop}`);
    console.log("=".repeat(80));

    // Redirect to new-install page
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/new-install?shop=${shop}&installed=true`;

    const response = NextResponse.redirect(redirectUrl);
    
    // Clear the state cookie
    response.cookies.delete("shopify_oauth_state");

    return response;
  } catch (error) {
    console.error("Error in Shopify OAuth callback:", error);
    return NextResponse.json(
      { error: "OAuth callback failed" },
      { status: 500 }
    );
  }
}
