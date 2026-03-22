import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, phoneNumber, firstName } = body;

        // ✅ Validation solide
        if (
            !amount ||
            typeof amount !== "number" ||
            amount < 100 ||
            !phoneNumber ||
            !phoneNumber.startsWith("237")
        ) {
            return NextResponse.json(
                { error: "Données invalides" },
                { status: 400 }
            );
        }

        // ⏱ Timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch("https://api.pay.mynkwa.com/collect", {
            method: "POST",
            headers: {
                "X-API-Key": process.env.MYNKWA_API_KEY!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                phoneNumber,
                description: `Donation from ${firstName || "Anonymous"}`,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data?.message ||
                data?.error ||
                "Erreur paiement";

            return NextResponse.json(
                { error: errorMessage },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            status: data.status || "pending",
            transactionId: data.transactionId,
        });

    } catch (error) {
        console.error("Erreur API Mynkwa:", error);

        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}