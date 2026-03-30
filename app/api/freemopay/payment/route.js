// app/api/freemopay/payment/route.ts
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Payment request body:', body);

        // 1. Get token from your internal endpoint
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
            || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        const tokenUrl = `${baseUrl}/api/freemopay/token`;
        console.log('Fetching token from:', tokenUrl);

        const tokenRes = await fetch(tokenUrl.access_token, { cache: 'no-store' });
        if (!tokenRes.ok) {
            const tokenText = await tokenRes.text();
            console.error('Token fetch failed:', tokenRes.status, tokenText);
            return NextResponse.json(
                { message: 'Failed to get token', details: tokenText },
                { status: 500 }
            );
        }

        const tokenData = await tokenRes.json();
        const token = tokenData.access_token; // adjust if the key is different (e.g., access_token)
        console.log('Token received:', token ? 'yes' : 'no');

        // 2. Initiate payment with FreemoPay
        const paymentBody = {
            payer: body.phone,
            amount: body.amount,
            externalId: body.reference,
            description: body.description || "Payment via ESFPlus",
            callback: body.callback_url || "https://esfplus.vercel.app/fr/api/freemopay/webhook",
        };
        console.log('Payment payload:', paymentBody);

        const paymentRes = await fetch(`${process.env.FREEMO_BASE_URL}/api/v2/payment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentBody),
        });

        const text = await paymentRes.text();
        console.log('Payment response raw:', text);

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            console.error('Invalid JSON from FreemoPay:', text);
            return NextResponse.json(
                { message: "Invalid response from FreemoPay", raw: text },
                { status: 500 }
            );
        }

        if (!paymentRes.ok) {
            console.error('Payment initiation failed:', paymentRes.status, data);
            return NextResponse.json(
                { message: data?.message || "Payment initiation failed", raw: data },
                { status: paymentRes.status }
            );
        }

        console.log('Payment initiated successfully:', data);
        return NextResponse.json(data);
    } catch (err) {
        console.error('Payment endpoint error:', err);
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}