import './App.css'
import Header from './components/HomePageComponents/header'
import SideBar from './components/HomePageComponents/SideBar'
import Dashboard from './Pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import TransactionsBord from './Pages/TransactionsBord'
import LogsBord from './Pages/LogsBord'
import ClientsBord from './Pages/ClientsBord'
import AdminBord from './Pages/AdminBord'
import ATMPage from './Pages/ATMPage'
import LogInPage from './Pages/LogInPage'
import UserViewPage from './Pages/UserViewPage'
import ClientATMViewPage from './Pages/ClientATMViewPage'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/dashboard/*" element={<UserViewPage />} />
        <Route path="/clientATM/*" element={<ClientATMViewPage />} />
      </Routes>
    </>
  );
}

export default App
