"use client";

import { useEffect, useState, useTransition } from "react";

export default function DonationPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const donors = [
        { name: "Simone", amount: 120000 },
        { name: "Paul", amount: 5000 },
        { name: "Amina", amount: 75000 },
        { name: "Jean", amount: 3000 },
        { name: "Fatou", amount: 10000 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % donors.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const [selectedAmount, setSelectedAmount] = useState(1000);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Polling state
    const [shouldPoll, setShouldPoll] = useState(false);
    const [reference, setReference] = useState("");

    // Polling effect
    useEffect(() => {
        if (!shouldPoll || !reference) return;

        let interval: NodeJS.Timeout;
        let attempts = 0;
        const maxAttempts = 30; // 30 * 5s = 2.5 minutes

        const poll = async () => {
            try {
                const res = await fetch(`/api/freemopay/status/${reference}`);
                const statusData = await res.json();

                if (statusData.status === "SUCCESS") {
                    clearInterval(interval);
                    setSuccess("Paiement réussi 🎉");
                    setShouldPoll(false);
                } else if (statusData.status === "FAILED") {
                    clearInterval(interval);
                    setError("Paiement échoué ❌");
                    setShouldPoll(false);
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        setError("Délai dépassé, veuillez vérifier votre transaction.");
                        setShouldPoll(false);
                    }
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        interval = setInterval(poll, 5000);
        return () => clearInterval(interval);
    }, [shouldPoll, reference]);

    const handleSubmit = () => {
        setError("");
        setSuccess("");

        if (!formData.phoneNumber) {
            setError("Numéro requis");
            return;
        }

        const newReference = "DON_" + Date.now();

        startTransition(async () => {
            try {
                const res = await fetch("/api/freemopay/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: selectedAmount,
                        phone: formData.phoneNumber,
                        reference: newReference,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Erreur paiement");
                }

                setSuccess("Validez le paiement sur votre téléphone...");
                setReference(newReference);
                setShouldPoll(true);
            } catch (err: any) {
                setError(err.message);
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
                <h1 className="text-xl font-bold text-center">Faire un don</h1>

                {/* Montants */}
                <div className="grid grid-cols-2 gap-2">
                    {[1000, 5000, 10000, 25000].map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setSelectedAmount(amount)}
                            className={`p-2 border rounded ${selectedAmount === amount ? "bg-orange-500 text-white" : ""
                                }`}
                        >
                            {amount} FCFA
                        </button>
                    ))}
                </div>

                {/* Inputs */}
                <input
                    placeholder="Téléphone"
                    className="w-full border p-2 rounded"
                    onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                />

                {/* Bouton */}
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="w-full bg-orange-500 text-white p-3 rounded"
                >
                    {isPending
                        ? "Traitement..."
                        : `Payer ${selectedAmount} FCFA`}
                </button>

                {/* Messages */}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </div>
        </div>
    );
}