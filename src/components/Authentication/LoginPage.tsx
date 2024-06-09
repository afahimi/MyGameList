import { useState } from "react";
import * as Yup from "yup";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

enum AuthMode {
  Register = "Register",
  Login = "Login",
}

export const LoginPage = () => {
  const { setLoginToken } = useContext(LoginContext);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.Login);

  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    password: "",
    re_enterPassword: "",
  });

  const [error, setError] = useState<Record<string, string | boolean>>({
    isError: false,
    message: "",
    status: "error",
  });

  const handleChangeAuthMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAuthMode((prev) =>
      prev === AuthMode.Login ? AuthMode.Register : AuthMode.Login
    );
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters"),
    email: Yup.string()
      .when("authMode", {
        is: () => authMode === AuthMode.Register,
        then: () =>
          Yup.string().email("Invalid email").required("Email is required"),
        otherwise: () => Yup.string().notRequired(),
      })
      .email("Invalid email"),
    password: Yup.string().required("Password is required"),
    re_enterPassword: Yup.string().when("authMode", {
      is: () => authMode === AuthMode.Register,
      then: () =>
        Yup.string()
          .required("Re-enter Password is required")
          .oneOf([Yup.ref("password")], "Passwords must match"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  type MyResponse = Response & { token?: string };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response: MyResponse = await fetch(
        `http://localhost:3000/${authMode.toLowerCase()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (authMode === AuthMode.Register) {
        if (response.ok) {
          console.log("Successfully registered");
          setSuccessState("Successfully registered");
          setAuthMode(AuthMode.Login);
        } else {
          setErrorState(data.message);
        }
      } else if (authMode === AuthMode.Login) {
        if (response.ok) {
          console.log("Successfully logged in");
          setSuccessState("Successfully logged in", 1000);
          setLoginToken(data.token);
        } else {
          setErrorState(data.message);
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorState(error.errors.join(", "));
      } else {
        console.error(error);
      }
    }
  };

  const setSuccessState = (message: string, time: number = 5000) => {
    setError((prev) => ({
      ...prev,
      message,
      isError: true,
      status: "success",
    }));

    setTimeout(() => {
      setError((prev) => ({
        ...prev,
        message: "",
        isError: false,
        status: "error",
      }));
      if (time === 1000) {
        navigate("/");
      }
    }, time);
  };

  const setErrorState = (message: string) => {
    setError((prev) => ({ ...prev, message, isError: true }));

    setTimeout(() => {
      setError((prev) => ({ ...prev, message: "", isError: false }));
    }, 5000);
  };

  return (
    <div className="h-4/5 w-screen justify-center items-center flex flex-col">
      <form
        className="flex flex-col gap-4 bg-gray-300 w-1/3 h-3/4 p-10 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold">{authMode}</h1>
        <div className="w-auto h-0.5 bg-gray-100" />
        <div className="flex flex-col h-full gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
              className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          {authMode === AuthMode.Register && (
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="text"
                id="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              id="password"
              value={formData.password}
              className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          {authMode === AuthMode.Register && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="re_enterPassword"
                className="text-lg font-semibold"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="re_enterPassword"
                value={formData.re_enterPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    re_enterPassword: e.target.value,
                  })
                }
                className="p-2 rounded-md border-2 border-gray-300 transition ease-in-out duration-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
          <div className="flex flex-row justify-end items-end h-full gap-8">
            <button
              onClick={handleChangeAuthMode}
              className="w-auto px-4 h-10 bg-gray-200 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              {authMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login}{" "}
              Instead
            </button>
            <button className="w-24 h-10 bg-gray-400 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
              {authMode}
            </button>
          </div>
        </div>
      </form>
      {error.isError && (
        <div className="absolute bottom-0 w-screen">
          <Alert status={error.status} className="rounded-md">
            <AlertIcon />
            <AlertTitle mr={2}>{error.message}</AlertTitle>
          </Alert>
        </div>
      )}
    </div>
  );
};
