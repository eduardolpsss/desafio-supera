// Importando JSON de produtos
import storeGames from "../data/products.json"
// Imports do Bootstrap
import { Row, Col, Card } from "react-bootstrap"
// Import components
import { StoreGame } from "../components/StoreGame"

export function Store() {
    return (
        <>
            <h1>Store</h1>

            <Row md={2} xs={1} lg={3} className="g-3">
                {storeGames.map((game) => (
                    <Col key={game.id}>
                        <StoreGame {...game } />
                    </Col>
                ))}
            </Row>
        </>
    )
}