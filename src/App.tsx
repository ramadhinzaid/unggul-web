import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";
import StockPage from "./pages/StockPage";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/unggul-web/" element={<DashboardPage />} />
          <Route path="/unggul-web/customers" element={<CustomerPage />} />
          <Route path="/unggul-web/stock" element={<StockPage />} />
          <Route path="/unggul-web/sales" element={<SalesPage />} />
        </Routes>
      </MainLayout>
      <ToastContainer />
    </Router>
  );
}

export default App;
