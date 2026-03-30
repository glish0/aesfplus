export async function GET() {
    try {
        const res = await fetch(`https://api-v2.freemopay.com/api/v2/payment/token`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(
                    `${process.env.FREEMO_APP_KEY}:${process.env.FREEMO_SECRET_KEY}`
                ).toString("base64"),
                "Content-Type": "application/json",
            },
        });

        // 🔥 lire d'abord en text
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
                { message: data?.message || "Erreur récupération token", raw: data },
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