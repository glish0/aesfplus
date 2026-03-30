"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


type donDataT = {
    email: string,
    montant: string

}
export async function enregistrerDon(donData: donDataT) {
    if (!donData.email || !donData.montant) {
        throw new Error("Email et montant requis");
    }


    const { data, error } = await supabase
        .from("don_recu")
        .insert([donData])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Erreur lors de l'enregistrement");
    }

    return {
        success: true,
        don: data,
    };
}