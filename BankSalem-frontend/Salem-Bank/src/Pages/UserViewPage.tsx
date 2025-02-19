import SideBar from "../components/HomePageComponents/SideBar";

import Header from "../components/HomePageComponents/header";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import ClientsBord from "./ClientsBord";
import TransactionsBord from "./TransactionsBord";
import LogsBord from "./LogsBord";
import AdminBord from "./AdminBord";
import ATMPage from "./ATMPage";
import LogOutDialog from "../components/LogOut/LogOut";
  import { useNavigate } from 'react-router-dom';
    import{useEffect} from 'react';

const UserViewPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    
   const userId = localStorage.getItem("currentUserID");

   if(userId == null) {
    navigate("/");
  }
  }, []);

  return (
    <div
      className="main-container"
  style={{
    margin: "0 auto",
    display: "flex",
    width: "100%",
    backgroundColor: "#F0F4F8",
  }}
>
  <SideBar />
  <div
    style={{
      flex: 1,
      padding: "16px",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clients" element={<ClientsBord />} />
      <Route path="/transactions" element={<TransactionsBord />} />
      <Route path="/logs" element={<LogsBord />} />
      <Route path="/admin" element={<AdminBord />} />

      <Route path="/atm" element={<ATMPage />} />
      <Route path="/logout" element={<LogOutDialog />} />
    </Routes>
  </div>
  </div>
  );
};

export default UserViewPage;
