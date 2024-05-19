import ControllerLogo from "../assets/game_icon.png";

export const Header = () => {
  return (
    <div className="w-screen h-28 bg-gray-400 flex flex-row items-center justify-between shadow-lg">
      <div className="flex gap-4">
        <a href="/">
          <div className="flex gap-1x items-center h-auto">
            <img
              src={ControllerLogo}
              alt="Controller Logo"
              className="w-24 self-center"
            />
            <h1 className="font-sans text-3xl font-bold mr-3">MyGamesList</h1>
          </div>
        </a>
        <div className="w-0.5 h-14 bg-gray-500 self-center" />
        <div className="flex flex-row gap-4 items-center">
          <button className="h-14 hover:text-white hover:bg-black transition duration-200 ease-in-out p-3 rounded-md">
            New Games
          </button>
          <button className="h-14 hover:text-white hover:bg-black transition duration-200 ease-in-out p-3 rounded-md">
            Genres
          </button>
          <button className="h-14 hover:text-white hover:bg-black transition duration-200 ease-in-out p-3 rounded-md">
            Trending
          </button>
          <button className="h-14 hover:text-white hover:bg-black transition duration-200 ease-in-out p-3 rounded-md">
            Top Rated
          </button>
        </div>
      </div>
      <div className="flex gap-12 mr-20">
        <button className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
          Login
        </button>
        <button className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
          Sign Up
        </button>
      </div>
    </div>
  );
};
