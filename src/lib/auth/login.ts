import { z } from "zod";
import { LOGIN_URL } from "@/constants/urls";
import { INSTITUTE_ID } from "@/constants/urls";

const loginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export async function loginUser(): Promise<z.infer<typeof loginResponseSchema>> {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_name: "aditya_ssdc",
            password: "aditya",
            client_name: "ADMIN_PORTAL",
            institute_id: INSTITUTE_ID,
        }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}
