
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return<BrowserRouter>
<Header />
  <Routes>
    <Route path="/" element={<Outlet />}>
    <Route index element={<Home />}></Route>
    <Route path="sign-in" element={<SignIn />}></Route>
    <Route path="sign-up" element={<SignUp />}></Route>
    <Route element={<PrivateRoute />}>
    <Route path="profile" element={<Profile />}></Route>
    </Route>
    <Route path="about" element={<About />}></Route>
    <Route path="verify-email" element={<VerifyEmail />}></Route>
    </Route>
  </Routes>
  </BrowserRouter>;
};

export default App;

