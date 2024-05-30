export const LoginPage = () => {
  return (
    <div className="flex h-3/4 w-screen justify-center items-center">
      <form className="flex flex-col gap-4 bg-gray-300 w-1/3 h-3/4 p-10 rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="w-auto h-0.5 bg-gray-100" />
        <div className="flex flex-col h-full gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-row justify-end items-end h-full gap-8">
            <button className="w-24 h-10 bg-gray-200 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out">
              Register
            </button>
            <button className="w-24 h-10 bg-gray-400 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
