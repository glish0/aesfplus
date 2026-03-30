// app/fr/api/freemopay/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Webhook reçu :", body);

        // Extract the relevant fields – adjust keys based on FreemoPay's actual payload
        const { reference, status, reason, amount } = body;

        // Validate that we have at least a reference and status
        if (!reference || !status) {
            console.warn("Invalid webhook payload:", body);
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // (Optional) Verify signature if FreemoPay provides one
        // const signature = req.headers.get("x-freemopay-signature");
        // if (!verifySignature(body, signature)) {
        //   return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        // }

        // Update your database (pseudo‑code)
        // await db.transaction.update({
        //   where: { reference },
        //   data: { status, reason, updatedAt: new Date() }
        // });

        if (status === "SUCCESS") {
            console.log("✅ Paiement réussi :", reference);
            // Additional business logic: send confirmation email, update donor list, etc.
        } else if (status === "FAILED") {
            console.log("❌ Paiement échoué :", reference);
        } else {
            console.log("ℹ️ Autre statut :", status);
        }

        // Always return a 200 to acknowledge receipt
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}