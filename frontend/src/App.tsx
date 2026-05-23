import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

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
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Auth Route */}
          <Route path="/auth" element={<Login />} />
        </Routes>

        {/* Popup message  */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default App;
