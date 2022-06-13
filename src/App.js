import { Router, Routes, Route } from "react-router"
import { useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Kanji from "./pages/Kanji";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  return (
    <>
    {(location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== 'error' && location.pathname !== '/404') && <Header />}
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/study/kanji" element={<Kanji />}></Route>
        </Routes>
    </>
  );
}

export default App;
