import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";

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
              value = new Date(value).toLocaleDateString();
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
      <h1>{JSON.stringify(gameDetails)}</h1>
      <br />
      <div className="flex flex-col gap-1 w-auto">
        <div className="w-1/3 h-auto bg-slate-300 rounded-lg shadow-md flex flex-col items-center px-5 py-4 gap-3">
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
        </div>
      </div>
    </div>
  );
};
