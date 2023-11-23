import storeGames from "../data/products.json"
import { Row, Col } from "react-bootstrap"
import { StoreGame } from "../components/StoreGame"

export function Store() {
    return (
        <>
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