// app/api/freemopay/payment/route.ts
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Payment request body:', body);






        // 2. Initiate payment with FreemoPay
        const paymentBody = {
            payer: body.phone,
            amount: body.amount,
            externalId: body.reference,
            description: body.description || "Payment via ESFPlus",
            callback: "https://esfplus.vercel.app/api/freemopay/webhook",
        };




        const username = process.env.FREEMO_APP_KEY;
        const password = process.env.FREEMO_SECRET_KEY;

        const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");
        console.log('body', body)
        console.log('basicAuth', basicAuth)
        console.log('basicAuth', basicAuth)

        const paymentRes = await fetch(`https://api-v2.freemopay.com/api/v2/payment`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basicAuth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentBody),
        });

        let data;


        if (!paymentRes.ok) {
            console.error('Payment initiation failed:', paymentRes.status, data);
            return NextResponse.json(
                { message: data?.message || "Payment initiation failed", raw: data },
                { status: paymentRes.status }
            );
        }


        return NextResponse.json({
            success: true,
            data: data,
            message: 'Payment initiated successfully'
        })
    } catch (err) {
        console.error('Payment endpoint error:', err);
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}