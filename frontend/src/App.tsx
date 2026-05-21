import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Generate from "./pages/Generate";

const App = () => {
  return (
    <>
      <div>
        {/* Routes  */}
        <Routes>
          {/* User Route */}
          <Route path="/" element={<MainLayout />}>
            <Route path="create" element={<Generate />} />
          </Route>

          {/* Auth Route */}
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
