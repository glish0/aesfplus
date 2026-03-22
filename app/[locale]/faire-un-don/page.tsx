"use client";

import { Pay } from "@nkwa-pay/sdk";
import { useEffect, useState, useTransition } from "react";
// adjust path if needed

export default function DonationPage() {
    // =============================
    // STATE
    // =============================
    const [selectedAmount, setSelectedAmount] = useState(110);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

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

    const handleSubmit = () => {
        setError(null);
        setSuccess(false);

        if (!formData.email || !formData.firstName || !formData.phoneNumber) {
            setError("Veuillez remplir tous les champs obligatoires");
            return;
        }

        startTransition(async () => {
            try {
                const res = await fetch("/api/pay", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: selectedAmount,
                        phoneNumber: formData.phoneNumber,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }

                if (data.status === "success") {
                    setSuccess(true);
                } else {
                    setError("Paiement en attente...");
                }

            } catch (err: any) {
                setError(err.message || "Erreur paiement");
            }
        });
    };

    return (
        <>
            <div className="w-full bg-purple-900 text-white text-center py-2 z-50">
                Merci à{" "}
                <span className="font-bold lowercase">{donors[currentIndex].name}</span>{" "}
                pour son don de{" "}
                <span className="font-bold">{donors[currentIndex].amount} FCFA</span>
            </div>
            <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-12">
                {/* BACKGROUND */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/pygmee1.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-3xl text-center text-white mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Faites une différence aujourd’hui
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed font-medium">
                        Chaque don, quel que soit son montant, a un impact réel et concret.
                        Grâce à votre soutien, nous pouvons financer des actions essentielles
                        comme l’accès à l’éducation, la santé, l’aide alimentaire ou encore
                        le développement de projets communautaires durables.
                        Il n’y a pas de “petit don” : chaque contribution compte et nous rapproche
                        un peu plus de notre objectif. Ensemble, nous pouvons changer des vies. 💛
                    </p>
                </div>

                {/* CONTENU */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 mb-10 gap-6 w-full max-w-6xl">
                    {/* COLONNE 1 : DON */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-purple-900 text-white text-center py-3 font-semibold">
                            Mon don
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                {[3000, 10000, 25000, 100000].map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setSelectedAmount(amount)}
                                        className={`py-3 rounded font-bold transition ${selectedAmount === amount
                                            ? "bg-orange-500 text-white"
                                            : "border"
                                            }`}
                                    >
                                        {amount} FCFA
                                    </button>
                                ))}
                            </div>
                            <button className="w-full border py-3 rounded font-semibold">
                                Montant libre
                            </button>
                            <p className="text-sm text-gray-600 text-center">
                                Vous offrez par exemple un kit d’hygiène à 3 familles
                            </p>
                        </div>
                    </div>

                    {/* COLONNE 2 : FORMULAIRE */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-purple-900 text-white text-center py-3 font-semibold">
                            Mes coordonnées
                        </div>
                        <div className="p-4 space-y-4">
                            <input
                                type="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full p-3 border rounded"
                                required
                            />
                            <input
                                placeholder="Prénom *"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                className="w-full p-3 border rounded"
                                required
                            />
                            <input
                                placeholder="Nom *"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                className="w-full p-3 border rounded"
                                required
                            />
                            <input
                                placeholder="Adresse"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </div>

                    {/* COLONNE 3 : PAIEMENT */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-purple-900 text-white text-center py-3 font-semibold">
                            Mon règlement
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button className="border-2 border-orange-500 text-orange-500 p-3 rounded">
                                    Mobile Money
                                </button>
                                <button className="border-2 border-orange-500 text-orange-500 p-3 rounded">
                                    Orange Money
                                </button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isPending}
                                className={`w-full py-4 rounded font-bold text-lg transition ${isPending
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-400 text-white"
                                    }`}
                            >
                                {isPending
                                    ? "Traitement..."
                                    : `JE VALIDE MON DON DE ${selectedAmount} FCFA`}
                            </button>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}
                            {success && (
                                <p className="text-green-600 text-sm text-center">
                                    Merci ! Votre don a bien été enregistré.
                                </p>
                            )}
                            <p className="text-xs text-gray-500 text-center">
                                Paiement sécurisé
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}