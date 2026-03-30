// app/api/freemopay/webhook/route.ts
import { NextResponse } from 'next/server';
import { enregistrerDon } from '@/lib/actions/don';

export async function POST(req) {
    try {
        const body = await req.json();

        // Destructure all relevant fields
        const { status, reference, amount, transactionType, externalId, message } = body;

        // Basic validation
        if (!reference || !status) {
            console.warn('Invalid webhook payload: missing reference or status', body);
            return NextResponse.json(
                { message: 'Missing required fields: reference and status' },
                { status: 400 }
            );
        }

        // Map the webhook data to your donation structure
        const donationData = {
            montant: amount?.toString() || '0',
            statut: status,
            message: message || null,
        };

        // Save the donation record
        await enregistrerDon(donationData);

        // Log based on status
        if (status === 'SUCCESS') {
            console.log(`✅ Paiement réussi : ${reference}`);
        } else if (status === 'FAILED') {
            console.log(`❌ Paiement échoué : ${reference} - ${message}`);
        } else {
            console.log(`⚠️ Statut inconnu : ${status} - ${reference}`);
        }

        // Always acknowledge receipt
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}