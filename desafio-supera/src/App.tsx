import { Routes, Route } from "react-router-dom"
import { Store } from "./pages/Store"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { CarrinhoProvider } from "./context/carrinhoContext"

export default function App() {
  return (
    <CarrinhoProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store/>} />
        </Routes>
      </Container>
    </CarrinhoProvider>
  )
}
