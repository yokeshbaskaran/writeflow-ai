import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";

const App = () => {
  return (
    <>
      <div>
        {/* Routes  */}
        <Routes>
          {/* User Route */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<Create />} />
          </Route>

          {/* Auth Route */}
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
