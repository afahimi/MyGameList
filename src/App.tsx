import { Header } from "./components/Header";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { useEffect, useState } from "react";

function App() {
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/titles")
      .then((response) => response.json())
      .then((data) => data.map((item: { title: string }) => item.title))
      .then((data) => {
        setTitles(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    console.log(titles);
  }, [titles]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="flex flex-col gap-9">
          <Header />
          <WelcomeModal />
        </div>
      </div>
    </>
  );
}

export default App;
