import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

// PageLoader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    Loading...
  </div>
);

function ProtectedRoute() {
  const { authUser, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return authUser ? <Outlet /> : <Navigate to="/auth" />;
}

// AuthRedirect
function AuthRedirect() {
  const { authUser, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return authUser ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

const App = () => {
  return (
    <>
      <div>
        {/* Routes  */}
        <Routes>
          {/* Layout routes */}
          <Route path="/" element={<MainLayout />}>
            {/* Public */}
            {/* <Route index element={<Home />} /> */}

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<Create />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Guest-only auth routes */}
          <Route element={<AuthRedirect />}>
            <Route path="/auth" element={<Login />} />
          </Route>
        </Routes>

        {/* Popup message  */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default App;
