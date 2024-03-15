import { useSelector } from "react-redux";
import DashboardScreen from "./Screens/DashboardScreen/DashboardScreen";
import LandingScreen from "./Screens/LandingScreen/LandingScreen";
import Authenticate from "./components/Authentication/Authenticate";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StockManagement from "./Screens/StockManagementScreen/StockManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route element={<Authenticate />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/stock" element={<StockManagement />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
