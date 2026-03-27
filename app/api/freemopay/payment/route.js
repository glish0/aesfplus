export async function POST(req) {
    const body = await req.json();

    // 1. récupérer token
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freemopay/token`);
    const tokenData = await tokenRes.json();

    const token = tokenData.token;

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
            operator: body.operator, // MTN ou ORANGE
            reference: body.reference,
            callback_url: "https://esfplus.vercel.app/fr/api/freemopay/webhook"
        }),
    });

    const data = await res.json();

    return Response.json(data);
}