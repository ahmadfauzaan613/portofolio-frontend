import { Route, Routes } from 'react-router-dom'
import AdminTemplate from './components/AdminTemplate'
import WrapperTamplate from './components/WrapperTamplate'
import { ProtectedRoute } from './lib/ProtectedRoute'
import Logs from './pages/Admin/ApiLogs/Logs'
import Category from './pages/Admin/Category/Category'
import Experiences from './pages/Admin/Experience/Experiences'
import Login from './pages/Admin/Login'
import PortofolioAdmin from './pages/Admin/Portofolio/Portofolio'
import Profile from './pages/Admin/Profile'
import Experience from './pages/Experience'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Portofolio from './pages/Portofolio'
import PortofolioDetail from './pages/PortofolioDetail'

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <WrapperTamplate container={false} viewNavbar={false}>
            <NotFound />
          </WrapperTamplate>
        }
      />
      {/* CLIENT */}
      <Route
        path="/"
        element={
          <WrapperTamplate container={true} viewNavbar={true}>
            <Home />
          </WrapperTamplate>
        }
      />
      <Route
        path="/experience"
        element={
          <WrapperTamplate container={true} viewNavbar={true}>
            <Experience />
          </WrapperTamplate>
        }
      />
      <Route
        path="/portfolio"
        element={
          <WrapperTamplate container={true} viewNavbar={true}>
            <Portofolio />
          </WrapperTamplate>
        }
      />
      <Route
        path="/portfolio/:id"
        element={
          <WrapperTamplate container={true} viewNavbar={true}>
            <PortofolioDetail />
          </WrapperTamplate>
        }
      />
      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <WrapperTamplate viewNavbar={false} container={false}>
            <Login />
          </WrapperTamplate>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <AdminTemplate>
              <Profile />
            </AdminTemplate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <ProtectedRoute>
            <AdminTemplate>
              <Experiences />
            </AdminTemplate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/portfolios"
        element={
          <ProtectedRoute>
            <AdminTemplate>
              <PortofolioAdmin />
            </AdminTemplate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/category"
        element={
          <ProtectedRoute>
            <AdminTemplate>
              <Category />
            </AdminTemplate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute>
            <AdminTemplate>
              <Logs />
            </AdminTemplate>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
