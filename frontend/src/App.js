import DashboardScreen from "./Screens/DashboardScreen/DashboardScreen";
import LandingScreen from "./Screens/LandingScreen/LandingScreen";
import Authenticate from "./components/Authentication/Authenticate";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PurchaseManagement from "./Screens/PurchaseManagementScreen/PurchaseManagement";
import PartyManagement from "./Screens/PartyScreens/PartyManagement";
import PartyDetails from "./Screens/PartyScreens/PartyDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route element={<Authenticate />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/purchase" element={<PurchaseManagement />} />
          <Route path="/party" element={<PartyManagement />} />
          <Route path="/party_details/:id" element={<PartyDetails />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
