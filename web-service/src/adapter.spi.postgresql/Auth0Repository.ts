import { IAuth0Repository } from "../core/candidat/ports/ICandidatRepository";

export class Auth0Repository implements IAuth0Repository {
    async getUserInfo(token_id: string): Promise<any> {
        if (!token_id) throw new Error("Token_id is not set");

        const res = await fetch(`https://or-aus.eu.auth0.com/userinfo`, {
            headers: {
                Authorization: `Bearer ${token_id}`,
            },
        });

        if (res.ok) return res.json();
        else throw new Error("Could not fetch user info from Auth0, verify credentials and Auth0 status");
    }
}
