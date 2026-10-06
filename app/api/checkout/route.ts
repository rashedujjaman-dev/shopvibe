import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items, customerDetails } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }


    let origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      origin = `https://${origin}`;
    }



    const cleanBaseUrl = origin.replace(/\/$/, "");

    const lineItems = items.map((item: any) => {
      const rawPrice = item.discountPrice ?? item.price ?? 0;
      const unitAmount = Math.round(Number(rawPrice) * 100);

      if (isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error(`Invalid price for item: ${item.name || "Product"}`);
      }


      const productImages: string[] = [];
      const imageSrc = item.image;

      if (imageSrc && typeof imageSrc === "string" && imageSrc.trim() !== "") {
        if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
          productImages.push(encodeURI(imageSrc));
        } else if (cleanBaseUrl.startsWith("https://")) {
          const cleanPath = imageSrc.startsWith("/") ? imageSrc : `/${imageSrc}`;
          const fullImageUrl = encodeURI(`${cleanBaseUrl}${cleanPath}`);
          productImages.push(fullImageUrl);
        } else {
          productImages.push("https://placehold.co/600x600/png?text=Product");
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Product",
            ...(productImages.length > 0 ? { images: productImages } : {}),
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity ? Number(item.quantity) : 1,
      };
    });

    // Creating a Stripe Checkout Session
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