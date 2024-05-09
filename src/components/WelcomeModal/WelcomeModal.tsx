import ControllerLogo from "../../assets/game_icon.png";
import { InputField } from "./InputField";

export const WelcomeModal = () => {
  return (
    <div className="w-screen h-auto flex justify-center items-center pt-12">
      <div className="flex gap-2 flex-col w-auto">
        <div className="flex flex-row gap-2 items-center">
          <img src={ControllerLogo} alt="Controller Logo" className="w-52" />
          <div className="flex flex-col gap-2 justify-between">
            <h1 className="font-sans text-4xl font-bold">
              Welcome to MyGamesList
            </h1>
            <p className="text-gray-500 text-xl">
              A place to keep track of all your favorite games in one place.
            </p>
          </div>
        </div>
        <InputField />
      </div>
    </div>
  );
};
