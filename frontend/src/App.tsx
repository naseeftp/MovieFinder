import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MoviesPage from './pages/MoviesPage'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#ffffff",
            border: "1px solid #333333",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/movies' element={<MoviesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
