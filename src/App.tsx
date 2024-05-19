import { Header } from "./components/Header";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/titles")
      .then((response) => response.json())
      .then((data) => data.map((item: { title: string }) => item.title))
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="flex flex-col gap-9">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomeModal />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
