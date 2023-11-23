import { createContext, useContext, ReactNode, useState  } from "react";
import { CarrinhoProviderProps, CarrinhoJogo, CarrinhoContextData } from "../types/types";
import { ModalCarrinho } from "../components/ModalCarrinho";

const CarrinhoContext = createContext({} as CarrinhoContextData);

export function useCarrinho() {
    return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {

    const [carrinhoJogos, setCarrinhoJogos] = useState<CarrinhoJogo[]>([]);
    const [modalCarrinhoAberto, setModalCarrinhoAberto] = useState(false);
    
    const abrirModalCarrinho = () => setModalCarrinhoAberto(true);
    const fecharModalCarrinho = () => setModalCarrinhoAberto(false);

    const quantidadeTotalNoCarrinho = carrinhoJogos.reduce((quantidade, jogo) => jogo.quantidade + quantidade, 0);

    function getGamesQuantity(id: number) {
        return carrinhoJogos.find(jogo => jogo.id === id)?.quantidade || 0;
    }

    function addGamesQuantity(id: number) {
        setCarrinhoJogos(carrinhoJogos => {
            if (carrinhoJogos.find(jogo => jogo.id === id) == null) {
                return [...carrinhoJogos, { id, quantidade: 1 }];
            } else {
                return carrinhoJogos.map(jogo => {
                    if (jogo.id === id) {
                        return { ...jogo, quantidade: jogo.quantidade + 1 };
                    } else {
                        return jogo;
                    }
                });
            }
        });
    }

    function removeGamesQuantity(id: number) {
        setCarrinhoJogos(carrinhoJogos => {
            if(carrinhoJogos.find(jogo => jogo.id === id)?.quantidade === 1) {
                return carrinhoJogos.filter(jogo => jogo.id !== id);
            } else {
                return carrinhoJogos.map(jogo => {
                    if (jogo.id === id) {
                        return { ...jogo, quantidade: jogo.quantidade - 1 };
                    } else {
                        return jogo;
                    }
                });
            }
        });
    }

    function removerDoCarrinho(id: number) {
        setCarrinhoJogos(carrinhoJogos => {
            return carrinhoJogos.filter(jogo => jogo.id !== id);
        });
    }

    return (
        <CarrinhoContext.Provider 
            value={{
                getGamesQuantity,
                addGamesQuantity,
                removeGamesQuantity,
                removerDoCarrinho,
                carrinhoJogos,
                quantidadeTotalNoCarrinho,
                abrirModalCarrinho,
                fecharModalCarrinho
            }}
        >
            {children}

            <ModalCarrinho modalCarrinhoAberto={modalCarrinhoAberto} />
        </CarrinhoContext.Provider>
    );
}