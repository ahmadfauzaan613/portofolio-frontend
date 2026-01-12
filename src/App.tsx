import { Route, Routes } from 'react-router-dom'
import WrapperTamplate from './components/WrapperTamplate'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Portofolio from './pages/Portofolio'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WrapperTamplate container={true}>
            <Home />
          </WrapperTamplate>
        }
      />
      <Route
        path="/experience"
        element={
          <WrapperTamplate container={true}>
            <Experience />
          </WrapperTamplate>
        }
      />
      <Route
        path="/portofolio"
        element={
          <WrapperTamplate container={true}>
            <Portofolio />
          </WrapperTamplate>
        }
      />
    </Routes>
  )
}
