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

        // 2. Initiate payment using the correct payload
        const paymentRes = await fetch(`https://api-v2.freemopay.com/api/v2/payment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "phone": "237655889677",
                "amount": "100",
                "reference": "order-12345",
                "description": "Test payment",
                "callback_url": "https://esfplus.vercel.app/fr/api/freemopay/webhook"
            }),
        });


        // 🔥 IMPORTANT : lire en text d'abord
        const text = await paymentRes.text();

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