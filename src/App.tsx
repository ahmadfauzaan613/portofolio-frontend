import { Route, Routes } from 'react-router-dom'
import AdminTemplate from './components/AdminTemplate'
import WrapperTamplate from './components/WrapperTamplate'
import Logs from './pages/Admin/ApiLogs/Logs'
import Experiences from './pages/Admin/Experience/Experiences'
import Login from './pages/Admin/Login'
import PortofolioAdmin from './pages/Admin/Portofolio/Portofolio'
import Profile from './pages/Admin/Profile'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Portofolio from './pages/Portofolio'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WrapperTamplate container={true} viweNavbar={true}>
            <Home />
          </WrapperTamplate>
        }
      />
      <Route
        path="/experience"
        element={
          <WrapperTamplate container={true} viweNavbar={true}>
            <Experience />
          </WrapperTamplate>
        }
      />
      <Route
        path="/portofolio"
        element={
          <WrapperTamplate container={true} viweNavbar={true}>
            <Portofolio />
          </WrapperTamplate>
        }
      />
      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <WrapperTamplate viweNavbar={false} container={false}>
            <Login />
          </WrapperTamplate>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <AdminTemplate>
            <Profile />
          </AdminTemplate>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <AdminTemplate>
            <Experiences />
          </AdminTemplate>
        }
      />
      <Route
        path="/admin/portfolios"
        element={
          <AdminTemplate>
            <PortofolioAdmin />
          </AdminTemplate>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <AdminTemplate>
            <Logs />
          </AdminTemplate>
        }
      />
    </Routes>
  )
}
