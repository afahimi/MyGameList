export const Header = () => {
  return (
    <div className="w-screen h-28 bg-gray-400 flex flex-row items-center justify-between shadow-lg">
      <div>
        <h1 className="ml-8 font-sans text-3xl font-bold">MyGameList</h1>
      </div>
      <div className="flex gap-12 mr-20">
        <button className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">Login</button>
        <button className="w-24 h-10 bg-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">Sign Up</button>
      </div>
    </div>
  );
};
