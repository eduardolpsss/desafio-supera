import React from "react"
// Imports do React Router
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
// Imports do Bootstrap
import { Container } from "react-bootstrap"
// Components
import { Navbar } from "./components/Navbar"

export default function App() {
  return (
    <div>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Container>
    </div>
  )
}
