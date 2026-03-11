// Shopify OAuth Token Manager
// Handles automatic token refresh using Client Credentials flow

interface ShopifyTokens {
  accessToken: string;
  expiresAt: number;
  scope: string;
}

let cachedTokens: ShopifyTokens | null = null;

export async function getShopifyAccessToken(): Promise<string> {
  // Check if we have a valid cached token (with 5 min buffer)
  if (cachedTokens && cachedTokens.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedTokens.accessToken;
  }

  // Get new access token using client credentials
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;

  if (!clientId || !clientSecret || !storeDomain) {
    throw new Error("Missing Shopify credentials in environment variables");
  }

  try {
    console.log("Requesting new Shopify access token...");
    
    // Request access token using client credentials flow
    const formData = new URLSearchParams();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);

    const response = await fetch(
      `https://${storeDomain}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shopify token request failed:", response.status, errorText);
      throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error("No access token in response");
    }

    // Cache the token with expiration time
    const expiresIn = data.expires_in || 86400; // Default 24h
    cachedTokens = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (expiresIn * 1000),
      scope: data.scope || "",
    };

    console.log("✓ Shopify access token obtained successfully");
    console.log(`  Expires in: ${Math.floor(expiresIn / 3600)} hours`);
    console.log(`  Scopes: ${cachedTokens.scope}`);

    return cachedTokens.accessToken;
  } catch (error) {
    console.error("Error getting Shopify access token:", error);
    throw error;
  }
}

export function clearTokenCache() {
  cachedTokens = null;
  console.log("Shopify token cache cleared");
}
