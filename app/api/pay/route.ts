import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, phoneNumber, firstName } = body;

        // ✅ Validation
        if (!amount || !phoneNumber) {
            return NextResponse.json(
                { error: "Données invalides" },
                { status: 400 }
            );
        }

        // 🔒 Appel API Mynkwa (serveur uniquement)
        const response = await fetch("https://api.pay.mynkwa.com/collect", {
            method: "POST",
            headers: {
                "X-API-Key": 'aap_pktnD6ObcS8mzUJ1B',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                phoneNumber,
                description: `Donation from ${firstName || "Anonymous"}`,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || "Erreur paiement" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });

    } catch (error) {
        console.error("Erreur API:", error);

        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}