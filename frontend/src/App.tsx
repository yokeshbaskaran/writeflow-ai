import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <>
      <div>
        {/* Routes  */}
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
