// app/api/freemopay/webhook/route.ts
import { NextResponse } from 'next/server';
import { enregistrerDon } from '@/lib/actions/don'




export async function POST(req) {
    try {
        const body = await req.json();

        const { reference, status, message } = body;

        if (!reference || !status) {
            console.warn("Invalid webhook payload:", body);
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Update transaction status in database
        /*  const { data: transaction, error: updateError } = await supabase
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
         } */

        if (status === "SUCCESS") {
            console.log("✅ Paiement réussi :", reference);


        } else if (status === "FAILED") {
            console.log("❌ Paiement échoué :", reference, message);
            await enregistrerDon({
                statut: transaction.status,
                message: transaction.message,
                montant: transaction.montant.toString()
            });
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