"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://fpjvgxvlinotwtjvaurz.supabase.co",
    "sb_publishable_1Q_mAQxYtmAL3XWZQaGTWA_mFIcFLWv"
);


type donDataT = {
    statut: string,
    montant: string,

    message: string,

}
export async function enregistrerDon(donData: donDataT) {
    if (!donData.message || !donData.montant) {
        throw new Error("Email et montant requis");
    }


    const { data, error } = await supabase
        .from("don_recu")
        .insert([donData])
        .select()
        .single();

    if (error) {
        console.error("Supabase error:", error);
        console.error("Error details:", {
            code: error.code,
            message: error.message,
            details: error.details
        });
        throw new Error("Erreur lors de l'enregistrement");
    }

    return {
        success: true,
        don: data,
    };
}