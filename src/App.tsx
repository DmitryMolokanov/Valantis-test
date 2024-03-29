import MainPages from "./pages/MainPages";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
