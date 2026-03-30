export async function GET() {
    try {
        // Call the FreemoPay token endpoint (POST with appKey/secretKey in body)
        const res = await fetch(`https://api-v2.freemopay.com/api/v2/payment/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                appKey: process.env.FREEMO_APP_KEY,
                secretKey: process.env.FREEMO_SECRET_KEY,
            }),
        });

        const text = await res.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            return Response.json(
                { message: "Invalid response from FreemoPay", raw: text },
                { status: 500 }
            );
        }

        if (!res.ok) {
            return Response.json(
                { message: data?.message || "Failed to get token", raw: data },
                { status: res.status }
            );
        }
        console.log('data token', data)
        // The API likely returns { token: "..." } – adjust if different
        return Response.json(data);
    } catch (err) {
        return Response.json(
            { message: err.message || "Server error" },
            { status: 500 }
        );
    }
}