import { Offcanvas, Stack } from 'react-bootstrap';
// Importando contexto do carrinho de compras
import { useCarrinho } from "../context/carrinhoContext"
// Importando componente de jogo no carrinho
import { JogoNoCarrinho } from "./JogoNoCarrinho"
import { formataVM } from '../utils/formataVM';
// Importando JSON de produtos
import storeGames from "../data/products.json"

type ModalCarrinhoProps = {
    modalCarrinhoAberto: boolean;
}

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

            <Offcanvas.Body>
                <Stack gap={3}>
                    {/* Mapeando os jogos do carrinho e passando as props para o componente */}
                    {carrinhoJogos.map((jogo) => (
                        <JogoNoCarrinho key={jogo.id} {...jogo}/>
                    ))}
                    {/* Validando se o carrinho está vazio */}
                    <div className="text-center">
                        {carrinhoJogos.length === 0 ? (
                            <p className="text-muted">Seu carrinho está vazio</p>
                        ) : (

                            // Se não estiver vazio, mostra o total e o botão de finalizar compra (que não faz nada)
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
                                
                                {/* Botão enfeite */}
                                <button className="btn btn-primary mt-3" disabled>Finalizar compra</button>
                            </div>
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
