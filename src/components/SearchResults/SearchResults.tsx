import { useEffect } from "react";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { useLocation } from "react-router-dom";

export const SearchResults = () => {
    const [searchResults, fetch_results] = useFetchSearchResults();

    const query_params = new URLSearchParams(useLocation().search).get("query");

    useEffect(() => {
        fetch_results(query_params || "");
    }, [query_params]);

    return (
        <div>
            <h1>Search Results</h1>
            <h1>{JSON.stringify(searchResults, null, 2)}</h1>
        </div>
    )
}