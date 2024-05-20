import { useEffect } from "react";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { useLocation } from "react-router-dom";
import { InputField } from "../WelcomeModal/InputField";
import { SearchElement } from "./SearchElement";

export const SearchResults = () => {
  const [searchResults, fetch_results] = useFetchSearchResults();

  const query_params = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    fetch_results(query_params || "");
  }, [query_params]);

  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-center mt-16">
        <div className="w-9/12 mb-5">
          <InputField />
        </div>
        <div className="h-fit w-9/12 flex justify-center bg-gray-200 py-2 rounded-sm shadow-sm">
          <h1 className="text-3xl font-bold">
            {Object.keys(searchResults).length} Search Results
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3 w-9/12 overflow-auto">
          {Object.keys(searchResults).map((key) => {
            return (
              <SearchElement {...searchResults[key]} key={key} />
            );
          })}
        </div>
      </div>
      {/* <h1>{JSON.stringify(searchResults, null, 2)}</h1> */}
    </div>
  );
};
