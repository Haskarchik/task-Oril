import "./App.css";
import List from "./components/list/List";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChartPage from "./components/chartPage/ChartPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/chart/:id" element={<ChartPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
