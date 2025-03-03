import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { loginUser } from "@/lib/auth/login";
import { setAuthorizationCookie } from "@/lib/auth/sessionUtility";
import { TokenKey } from "@/constants/auth/tokens";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const defaultUserLogin = async () => {
        const tokens = await loginUser();
        setAuthorizationCookie(TokenKey.accessToken, tokens.accessToken);
        setAuthorizationCookie(TokenKey.refreshToken, tokens.refreshToken);
    };
    useEffect(() => {
        defaultUserLogin();
        navigate({ to: "/question-papers" });
    });
}
