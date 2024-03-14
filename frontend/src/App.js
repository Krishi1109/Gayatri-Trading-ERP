import LandingScreen from "./Screens/LandingScreen/LandingScreen";
import LoginScreen from "./Screens/LoginScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={LandingScreen} />
        {/* <Route path="/login" Component={LoginScreen} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
