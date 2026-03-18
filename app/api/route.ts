// pages/api/donation.ts
import type { NextApiRequest, NextApiResponse } from "next";

type DonationRequest = {
    amount: number;
    phone: string;
    name: string;
};

type DonationResponse = {
    status: string;
    message: string;
    data?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DonationResponse>
) {
    if (req.method === "POST") {
        const { amount, phone, name } = req.body as DonationRequest;

        if (!amount || !phone || !name) {
            return res.status(400).json({ status: "error", message: "Tous les champs sont requis" });
        }

        try {
            const response = await fetch("https://api.flutterwave.com/v3/charges?type=mobile_money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                },
                body: JSON.stringify({
                    tx_ref: `don-${Date.now()}`,
                    amount,
                    currency: "XAF",
                    payment_type: "mobilemoney",
                    order_id: `don-${Date.now()}`,
                    redirect_url: "https://tonsite.com/merci", // page de remerciement
                    phone_number: phone,
                    fullname: name,
                }),
            });

            const data = await response.json();
            if (data.status === "success") {
                return res.status(200).json({ status: "success", message: "Paiement initié !", data });
            } else {
                return res.status(500).json({ status: "error", message: data.message || "Erreur de paiement" });
            }
        } catch (err: any) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ status: "error", message: `Method ${req.method} Not Allowed` });
    }
}