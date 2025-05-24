import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import MerchantDashboard from "./components/MerchantDashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
