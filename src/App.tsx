import { Header } from "./components/Header";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";

function App() {
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
