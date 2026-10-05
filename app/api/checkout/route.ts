import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items, customerDetails } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Setting the site's base URL
    let origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      origin = `https://${origin}`;
    }
    const cleanBaseUrl = origin.endsWith("/") ? origin.slice(0, -1) : origin;

    // Processing cart items and fixing image URLs
    const lineItems = items.map((item: any) => {
      const rawPrice = item.discountPrice ?? item.price ?? 0;
      const unitAmount = Math.round(Number(rawPrice) * 100);

      if (isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error(`Invalid price for item: ${item.name || "Product"}`);
      }

      // Validation logic for Stripe images
      const productImages: string[] = [];
      const imageSrc = item.image;

      if (imageSrc && typeof imageSrc === "string") {
        if (imageSrc.startsWith("https://")) {
          // If this is already a live HTTPS image link (e.g., Cloudinary, Unsplash, ImgBB)
          productImages.push(imageSrc);
        } else if (cleanBaseUrl.startsWith("https://")) {
          // It will add the local image path if the production site uses HTTPS.
          const cleanPath = imageSrc.startsWith("/") ? imageSrc : `/${imageSrc}`;
          productImages.push(`${cleanBaseUrl}${cleanPath}`);
        } else {
          // When running in localhost mode (http://localhost:3000), Stripe does not accept relative image links directly.
          // So default to an online placeholder image to avoid errors when doing local tests
          productImages.push("https://via.placeholder.com/300");
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Product",
            // The image field will be sent only if image processing is successful.
            ...(productImages.length > 0 ? { images: productImages } : {}),
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity ? Number(item.quantity) : 1,
      };
    });

    // ৩. Creating a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      customer_email:
        customerDetails?.email && customerDetails.email.includes("@")
          ? customerDetails.email
          : undefined,
      success_url: `${cleanBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cleanBaseUrl}/checkout`,
      metadata: {
        customerName: `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim(),
        address: customerDetails?.address || "N/A",
        phone: customerDetails?.phone || "N/A",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to generate Stripe checkout URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}