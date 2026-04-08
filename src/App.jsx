import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MessageBox from "./pages/MessageBox";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/AppRouteProtect";
import PublicRoute from "./routes/PublicRoute";
const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MessageBox />} />
              <Route path="profile" element={<Profile />} />
              <Route path="message" element={<MessageBox />} />
            </Route>

            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
