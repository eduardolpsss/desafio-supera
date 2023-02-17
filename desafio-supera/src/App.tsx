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
// Importando provider do carrinho para dar acesso a todos os componentes da aplicação
import { CarrinhoProvider } from "./context/carrinhoContext"

export default function App() {
  return (
    // App envolvida pelo provider do carrinho de compras e render da navbar e rotas da aplicação
    <CarrinhoProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Container>
    </CarrinhoProvider>
  )
}
