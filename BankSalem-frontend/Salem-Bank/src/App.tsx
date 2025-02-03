import './App.css'
import Header from './components/ClientsComponets/header'
import SideBar from './components/HomePageComponents/SideBar'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="main-container" style={{ display: 'flex' }} >
          <SideBar />
          <div style={{ flex: 1, padding: '20px' }}>
            <Header />
            <Dashboard />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
