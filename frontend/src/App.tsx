import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/errorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*"  element={<ErrorPage />}  />
    </Routes>
  );
}

export default App;
