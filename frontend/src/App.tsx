import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/errorPage";
import { NotificationContainer } from "./components/NotificationContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*"  element={<ErrorPage />}  />
      </Routes>
      <NotificationContainer />
    </>
  );
}

export default App;
