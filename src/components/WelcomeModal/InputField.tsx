import { Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const InputField = () => {
  return (
    <div className="flex flex-row w-full justify-center">
      <Input placeholder="Search for games" size="lg" w="full" />
      <button className="h-auto w-12 hover:text-white hover:bg-black bg-gray-400 transition duration-200 ease-in-out p-3 rounded-r-lg">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};
