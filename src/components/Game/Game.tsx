import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { InfoContainer } from "../helpers/InfoContainer";
import { Textarea } from "@chakra-ui/react";

const sanitizeTitle = (title: string) => {
  return title.replace(/ /g, "_").replace(/[:?!/\\*<>|]/g, "");
};

export const Game = () => {
  const { title } = useParams<{ title: string }>();
  const decodedTitle = decodeURIComponent(title ?? "");

  const [searchResults, fetch_results] = useFetchSearchResults();
  const gameDetails = searchResults[0]
    ? Object.fromEntries(
        Object.entries(searchResults[0])
          .filter(([key]) =>
            ["publisher", "release_date", "star_rating"].includes(key)
          )
          .map(([key, value]) => {
            if (key === "release_date") {
              key = "Release Date";
              value = new Date(value).toLocaleDateString();
            } else if (key === "star_rating") {
              key = "Star Rating";
              value = parseFloat(value) == 0.0 ? "No ratings" : value + "/5";
            } else {
              key = "Publisher";
            }
            return [key, value];
          })
      )
    : {};

  useEffect(() => {
    fetch_results(decodedTitle);
  }, [decodedTitle, fetch_results]);

  return (
    <div className="pt-8 px-28">
      {/* <h1>{JSON.stringify(searchResults[0])}</h1>
      <br /> */}
      <div className="flex flex-row justify-center gap-10 w-full">
        <div className="w-1/3">
          <InfoContainer>
            <h1 className="text-2xl font-bold">{"Game Info"}</h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <img
              src={`http://localhost:3000/images/${sanitizeTitle(
                searchResults[0]?.title ?? ""
              )}.png`}
              alt={searchResults[0]?.title ?? ""}
              className=" object-cover rounded-md w-80"
            />
            <div className="h-0.5 w-full bg-slate-400" />
            <div className="grid grid-cols-2 gap-2 w-full justify-items-center">
              {Object.entries(gameDetails).map(([key, value]) => (
                <>
                  <h3 key={key} className="text-xl font-semibold">
                    {key}:
                  </h3>
                  <h3 key={value} className="text-xl font-light">
                    {value}
                  </h3>
                </>
              ))}
            </div>
          </InfoContainer>
        </div>
        <div className="w-1/3 flex flex-col gap-5">
          <InfoContainer>
            <h1 className="text-2xl font-bold">
              {searchResults[0]?.title ?? ""}
            </h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <p className="text-xl">{searchResults[0]?.description ?? ""}</p>
          </InfoContainer>
          <InfoContainer>
            <h1 className="text-2xl font-bold">Reviews</h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <Textarea
              placeholder="Leave a review"
              size="md"
              resize="none"
              w="full"
              bg={"white"}
            />
          </InfoContainer>
        </div>
      </div>
    </div>
  );
};
