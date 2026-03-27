export async function GET(req, { params }) {
    const { reference } = params;

    const tokenRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/freemopay/token`
    );
    const tokenData = await tokenRes.json();

    const res = await fetch(
        `${process.env.FREEMO_BASE_URL}/api/v2/payment/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${tokenData.token}`,
            },
        }
    );

    const data = await res.json();
    return Response.json(data);
}