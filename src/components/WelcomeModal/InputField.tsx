import { Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const InputField = () => {
  const [searchResults, fetch_results] = useFetchSearchResults();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch_results(searchQuery);
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row w-full justify-center">
      <Input
        placeholder="Search for games"
        size="lg"
        w="full"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        type="submit"
        className="h-auto w-12 hover:text-white hover:bg-black bg-gray-400 transition duration-200 ease-in-out p-3 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};
