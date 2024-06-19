import { authenticatedGet } from "@/auth/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Get Commune offers stats"],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            return await authenticatedGet(token, "/v1/users/getCommuneOffersStats");
        },
    });

    return (
        <div>
            {isLoading ? "load" : isError ? data["error"] : "Dashboard"}
        </div>
    );
}
