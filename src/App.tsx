import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Navbar from "./Pages/Home/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/navbar"
            element={
              <PrivateRoute>
                <Navbar />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
