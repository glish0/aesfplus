// app/api/freemopay/webhook/route.ts
import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { enregistrerDon } from "@/app/actions/donActions";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Webhook reçu :", body);

        const { reference, status, message } = body;

        if (!reference || !status) {
            console.warn("Invalid webhook payload:", body);
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Update transaction status in database
        const { data: transaction, error: updateError } = await supabase
            .from("transactions")
            .update({
                status: status === "SUCCESS" ? "SUCCESS" : "FAILED",
                payment_status: status,
                error_message: message,
                updated_at: new Date().toISOString()
            })
            .eq("reference", reference)
            .select()
            .single();

        if (updateError) {
            console.error("Failed to update transaction:", updateError);
        }

        if (status === "SUCCESS" && transaction) {
            console.log("✅ Paiement réussi :", reference);

            // Store donation in database
            try {
                const result = await enregistrerDon({
                    email: transaction.email,
                    montant: transaction.montant.toString()
                });

                if (result.success) {
                    console.log("✅ Don enregistré en base de données:", result.don);
                }
            } catch (dbError) {
                console.error("❌ Erreur lors de l'enregistrement du don:", dbError);
            }
        } else if (status === "FAILED") {
            console.log("❌ Paiement échoué :", reference, message);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}