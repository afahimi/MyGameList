import ControllerLogo from "../assets/game_icon.png";
import ProfilePicture from "../assets/pfp.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";

export const Header = () => {
  const navigate = useNavigate();

  const { loginToken, clearToken } = useContext(LoginContext);

  useEffect(() => {
    console.log("token value in header: ", loginToken);
  }, [loginToken]);

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
      <div className="flex gap-10 mr-20 items-center">
        {loginToken === "" ? (
          <button
            className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <>
          <img src={ProfilePicture} alt="Profile Picture" className="w-10 h-10 rounded-full" />
            <button
              className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
              onClick={() => {
                navigate("/");
                clearToken();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
