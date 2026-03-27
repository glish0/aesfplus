export async function POST(req) {
    const body = await req.json();

    console.log("Webhook reçu :", body);

    const { status, reference } = body;

    if (status === "SUCCESS") {
        console.log("Paiement réussi :", reference);
        // 👉 ici tu peux sauvegarder en DB
    }

    if (status === "FAILED") {
        console.log("Paiement échoué :", reference);
    }

    return Response.json({ received: true });
}