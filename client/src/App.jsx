
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return<BrowserRouter>
<Header />
  <Routes>
    <Route path="/" element={<Outlet />}>
    <Route index element={<Home />}></Route>
    <Route path="sign-in" element={<SignIn />}></Route>
    <Route path="sign-up" element={<SignUp />}></Route>
    <Route path="profile" element={<Profile />}></Route>
    <Route path="about" element={<About />}></Route>
    </Route>
  </Routes>
<Footer />
  </BrowserRouter>;
};

export default App;
