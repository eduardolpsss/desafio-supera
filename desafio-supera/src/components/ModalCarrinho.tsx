import { ModalCarrinhoProps } from "../types/types";
import { Offcanvas, Stack } from 'react-bootstrap';
import { useCarrinho } from "../context/carrinhoContext"
import { JogoNoCarrinho } from "./JogoNoCarrinho"
import { formataVM } from '../utils/formataVM';
import storeGames from "../data/products.json"


export function ModalCarrinho( { modalCarrinhoAberto }: ModalCarrinhoProps ) {

    const { fecharModalCarrinho, carrinhoJogos } = useCarrinho();

    return (
        <Offcanvas
            show={modalCarrinhoAberto} 
            placement="end" 
            onHide={fecharModalCarrinho}
            style={{ color: "white", backgroundColor: "#1a1a1a" }}
            >
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>Carrinho de compras</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Stack gap={3} style={{ flex: 1 }}>
                    {carrinhoJogos.map((jogo) => (
                    <JogoNoCarrinho key={jogo.id} {...jogo} />
                    ))}
                    <div className="text-center mt-auto" style={{ width: "100%" }}>
                        {carrinhoJogos.length === 0 ? (
                            <p className="text-muted">Seu carrinho está vazio</p>
                        ) : (
                            <div>
                                <div className="text-center">
                                    Total:{" "}
                                    {formataVM(
                                        carrinhoJogos.reduce((total, carrinhoJogo) => {
                                        const jogo = storeGames.find(i => i.id === carrinhoJogo.id);
                                        return total + (jogo?.price || 0) * carrinhoJogo.quantidade;
                                    }, 0)
                                    )}
                                </div>
                                
                                <button className="btn btn-primary mt-3">Finalizar compra</button>
                            </div>
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
