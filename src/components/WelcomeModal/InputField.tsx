import { Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { useEffect, useState } from "react";

export const InputField = () => {
  const [searchResults, fetch_results] = useFetchSearchResults();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  
  return (
    <div className="flex flex-row w-full justify-center">
      <Input
        placeholder="Search for games"
        size="lg"
        w="full"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch_results(searchQuery);
        }}
        className="h-auto w-12 hover:text-white hover:bg-black bg-gray-400 transition duration-200 ease-in-out p-3 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};
