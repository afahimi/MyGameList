import { Header } from "./components/Header";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { LoginPage } from "./components/Authentication/LoginPage";
import { LoginContext } from "./contexts/LoginContext";
import { useState, useEffect } from "react";
import { User } from "./components/User/User";

function App() {
  const [loginToken, setLoginToken] = useState<string>("");

  useEffect(() => {
    console.log("token updated: ", loginToken);
    if (loginToken) {
      localStorage.setItem("loginToken", loginToken);
    }
  }, [loginToken]);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setLoginToken(token);
    }
  }, []);

  const clearToken = () => {
    localStorage.removeItem("loginToken");
    setLoginToken("");
  }

  return (
    <>
      <LoginContext.Provider value={{ loginToken, setLoginToken, clearToken }}>
        <div className="w-screen h-screen flex justify-center">
          <div className="flex flex-col gap-9 w-screen">
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<WelcomeModal />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={loginToken === "" ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/user" element={loginToken ? <User token={loginToken}/> : <Navigate to="/login" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </LoginContext.Provider>
    </>
  );
}

export default App;
