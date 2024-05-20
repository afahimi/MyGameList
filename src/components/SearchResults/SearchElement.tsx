const sanitizeTitle = (title: string) => {
  return title.replace(/ /g, "_").replace(/[:?!/\\*<>|]/g, "");
};

export const SearchElement = (game: Record<string, string>, key: number) => {
    const releaseDate = new Date(game.release_date);
  return (
    <div className="flex flex-row gap-2 bg-gray-300 p-4 rounded-md h-auto items-center border-2 hover:border-gray-400 transition ease-linear" key={key}>
      <img
        src={`http://localhost:3000/images/${sanitizeTitle(game.title)}.png`}
        alt={game.title}
        className=" object-cover rounded-md max-w-20"
      />
      <div className="flex flex-col ml-3 self-start">
      <h1 className="text-lg font-semibold self-start">{game.title}</h1>
      <h2 className="text-sm font-light self-start">{game.publisher}</h2>
      <h3 className="text-sm font-light self-start">{releaseDate.getMonth()+1}-{releaseDate.getDate()}-{releaseDate.getFullYear()}</h3>
      </div>
    </div>
  );
};
