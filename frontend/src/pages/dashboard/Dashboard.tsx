import { authenticatedGet } from "@/auth/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
// import { Box } from "@mui/material";

export function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function callApi() {
            try {
                const token = await getAccessTokenSilently();
                const document = await authenticatedGet(token, "/v1/offres");
                setData(document);
                console.log(data);
            } catch (error) {
                console.info(error);
                setError(`Error from web service: ${error}`);
            } finally {
                setLoading(false);
            }
        }
        callApi();
    }, []);

    return <div>{loading ? "load" : error ? "error" : "Dashboard"}</div>;
}
