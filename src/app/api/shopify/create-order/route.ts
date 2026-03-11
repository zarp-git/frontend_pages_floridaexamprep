import { NextRequest, NextResponse } from "next/server";
import { ShopifyOrderRequest, ShopifyOrderResponse } from "@/types/bookstore";
import { getShopifyAccessToken } from "@/lib/shopify-auth";

export async function POST(req: NextRequest) {
  try {
    const body: ShopifyOrderRequest = await req.json();
    
    // Validação básica
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!body.customer?.email) {
      return NextResponse.json(
        { success: false, error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Calcula total no backend (segurança)
    const total = body.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Prepara line items para Shopify Draft Order
    const lineItems = body.items.map((item) => ({
      title: item.product.name,
      price: item.product.price.toFixed(2),
      quantity: item.quantity,
      taxable: true,
    }));

    // Get access token
    const accessToken = await getShopifyAccessToken();
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;

    // Cria Draft Order no Shopify
    const draftOrderResponse = await fetch(
      `https://${storeDomain}/admin/api/2024-01/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({
          draft_order: {
            line_items: lineItems,
            customer: {
              email: body.customer.email,
              first_name: body.customer.firstName || "",
              last_name: body.customer.lastName || "",
            },
            email: body.customer.email,
            note: `Order from bookstore - Total: $${total.toFixed(2)}`,
            tags: "bookstore, online-order",
            use_customer_default_address: false,
          },
        }),
      }
    );

    if (!draftOrderResponse.ok) {
      const errorData = await draftOrderResponse.json();
      console.error("Shopify Draft Order Error:", errorData);
      
      // Se o erro for de autenticação, limpa o cache e tenta novamente
      if (draftOrderResponse.status === 401) {
        const { clearTokenCache } = await import("@/lib/shopify-auth");
        clearTokenCache();
        return NextResponse.json(
          { success: false, error: "Authentication failed. Please try again." },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: errorData.errors || "Failed to create draft order" },
        { status: draftOrderResponse.status }
      );
    }

    const data = await draftOrderResponse.json();
    
    // Retorna a URL de invoice do draft order
    const response: ShopifyOrderResponse = {
      success: true,
      checkoutUrl: data.draft_order.invoice_url,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating Shopify order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
