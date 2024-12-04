import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";

function App() {
  return (
      <>
          <NavBar />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Landing />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
