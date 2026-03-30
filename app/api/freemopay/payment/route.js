export async function POST(req) {
    try {
        const body = await req.json();

        // 1. récupérer token
        // 1. Get token from your local endpoint
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const tokenRes = await fetch(`${baseUrl}/api/freemopay/token`, {
            cache: "no-store",
        });
        const tokenData = await tokenRes.json();

        if (!tokenRes.ok) {
            return Response.json(
                { message: tokenData.message || "Failed to get token" },
                { status: 500 }
            );
        }

        const token = tokenData.access_token;

        // 2. init paiement
        const res = await fetch(`${process.env.FREEMO_BASE_URL}/api/v2/payment`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: body.amount,
                phone: body.phone,
                operator: body.operator,
                reference: body.reference,
                callback_url: "https://esfplus.vercel.app/fr/api/freemopay/webhook"
            }),
        });

        // 🔥 IMPORTANT : lire en text d'abord
        const text = await res.text();

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            return Response.json(
                { message: "Réponse FreemoPay invalide", raw: text },
                { status: 500 }
            );
        }

        if (!res.ok) {
            return Response.json(
                { message: data?.message || "Erreur paiement FreemoPay", raw: data },
                { status: res.status }
            );
        }

        return Response.json(data);

    } catch (err) {
        return Response.json(
            { message: err.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}