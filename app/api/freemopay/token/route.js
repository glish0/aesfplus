export async function GET() {
    const res = await fetch(`${process.env.FREEMO_BASE_URL}/api/v2/payment/token`, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + Buffer.from(
                process.env.FREEMO_APP_KEY + ":" + process.env.FREEMO_SECRET_KEY
            ).toString("base64"),
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    return Response.json(data);
}