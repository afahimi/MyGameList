import { Header } from "./components/Header";

function App() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="flex flex-col gap-9">
          <Header />
          <div className="w-6 h-6 bg-red-600" />
        </div>
      </div>
    </>
  );
}

export default App;