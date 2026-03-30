// app/api/freemopay/status/[reference]/route.ts
import { NextRequest } from "next/server";

export async function GET(
    req,
    { params }
) {
    try {
        const { reference } = params;

        // 1. Get a fresh token from your internal endpoint
        const baseUrl = 'https://esfplus.vercel.app/' || "http://localhost:3000";
        const tokenRes = await fetch(`https://esfplus.vercel.app/api/freemopay/token`, {
            cache: "no-store",
        });

        if (!tokenRes.ok) {
            const tokenData = await tokenRes.json();
            return Response.json(
                { message: tokenData.message || "Failed to get token" },
                { status: 500 }
            );
        }

        const tokenData = await tokenRes.json();
        const token = tokenData.access_token;

        // 2. Call FreemoPay status API
        const apiUrl = `${process.env.FREEMO_BASE_URL}/api/v2/payment/${reference}`;
        const paymentRes = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const text = await paymentRes.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            return Response.json(
                { message: "Invalid response from FreemoPay", raw: text },
                { status: 500 }
            );
        }

        if (!paymentRes.ok) {
            return Response.json(
                { message: data?.message || "Failed to get payment status", raw: data },
                { status: paymentRes.status }
            );
        }

        // 3. Return the status (make sure the frontend expects 'status' field)
        // The API returns: { reference, merchandRef, amount, status, reason }
        return Response.json({
            status: data.status,      // "SUCCESS", "FAILED", etc.
            message: data.reason || data.message,
            reference: data.reference,
            amount: data.amount,
        });
    } catch (err) {
        return Response.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}