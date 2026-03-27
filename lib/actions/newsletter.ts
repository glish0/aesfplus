"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
    'https://fpjvgxvlinotwtjvaurz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwanZneHZsaW5vdHd0anZhdXJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUzNzAwNiwiZXhwIjoyMDkwMTEzMDA2fQ.QwtrTnFIF8dToISWkZXO4OFrjG2WMh1ZnhMbZ-dIkvs'
);


export async function subscribeToNewsletter(email: string) {
    if (!email) {
        throw new Error("Email requis");
    }

    const { error } = await supabase
        .from("newsletter")
        .insert([{ email }]);

    if (error) {
        throw new Error("Erreur DB");
    }


    return { success: true };
}