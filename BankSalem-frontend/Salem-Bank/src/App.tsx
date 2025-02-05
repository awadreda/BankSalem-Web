import './App.css'
import Header from './components/ClientsComponets/header'
import SideBar from './components/HomePageComponents/SideBar'
import Dashboard from './Pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import TransactionsBord from './Pages/TransactionsBord'
import LogsBord from './Pages/LogsBord'
import ClientsBord from './Pages/ClientsBord'
import AdminBord from './Pages/AdminBord'
import ATMPage from './Pages/ATMPage'
function App() {

  return (
    <>
      <div className="main-container" style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ClientsBord />} />
            <Route path="/transactions" element={<TransactionsBord />} />
            <Route path="/logs" element={<LogsBord />} />
            <Route path="/admin" element={<AdminBord />} />   
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="/atm" element={<ATMPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App
