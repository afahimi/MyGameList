import { useState } from 'react';

type UseFetchSearchResultsReturn = [Record<string,string>, (searchQuery: string) => Promise<void>];

const useFetchSearchResults = (): UseFetchSearchResultsReturn => {
  const [searchResults, setSearchResults] = useState<Record<string,string>>({});

  const fetch_results = async (searchQuery: string) => {
    fetch("http://localhost:3000/search",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
        })
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return [searchResults, fetch_results];
}

export default useFetchSearchResults;