"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://fpjvgxvlinotwtjvaurz.supabase.co",
    "sb_publishable_1Q_mAQxYtmAL3XWZQaGTWA_mFIcFLWv"
);


type donDataT = {
    email: string,
    montant: string,
    status: string,
    reference: string,
    nom: string,

}
export async function enregistrerTransact(donData: donDataT) {
    if (!donData.email || !donData.montant) {
        throw new Error("Email et montant requis");
    }


    const { data, error } = await supabase
        .from("transactions")
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
        throw new Error(`Erreur lors de l'enregistrement: ${error.message}`);
    }

    return {
        success: true,
        don: data,
    };
}