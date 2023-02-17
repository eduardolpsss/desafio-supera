import { createContext, useContext, ReactNode, useState  } from "react";

// Tipagem do provider do carrinho de compras (children é o que vai ser renderizado dentro do provider)
type CarrinhoProviderProps = {
    // Tipo que aceita qualquer coisa que o React aceite como filho
    children: ReactNode;
}

// Tipagem do dados que o carrinho de compras vai receber
type CarrinhoContextData = {
    getGamesQuantity: (id: number) => number;
    addGamesQuantity: (id: number) => void;
    removeGamesQuantity: (id: number) => void;
    removerDoCarrinho: (id: number) => void;
}

// Tipagem do carrinho de compras (id do jogo e quantidade)
type CarrinhoJogo = {
    id: number;
    quantidade: number;
}

// Criando contexto do carrinho de compras
const CarrinhoContext = createContext({} as CarrinhoContextData);

// Função para pegar o contexto do carrinho de compras
export function useCarrinho() {
    return useContext(CarrinhoContext);
}

// Provider do carrinho de compras (passa todos os dados do carrinho de compras e renderiza a view do mesmo)
export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
    // Usando o hook useState para ter aonde armazenar os dados do carrinho de compras
    const [carrinhoJogo, setCarrinhoJogo] = useState<CarrinhoJogo[]>([]);

    // Função para pegar a quantidade de um jogo no carrinho de compras
    function getGamesQuantity(id: number) {
        return carrinhoJogo.find(jogo => jogo.id === id)?.quantidade || 0;
    }

    // Função para adicionar a quatidade de um jogo no carrinho de compras
    function addGamesQuantity(id: number) {
        setCarrinhoJogo(carrinhoJogo => {
            // Verificando se o jogo já está no carrinho de compras
            if (carrinhoJogo.find(jogo => jogo.id === id) == null) {
                // Se não estiver, adiciona o jogo no carrinho de compras
                return [...carrinhoJogo, { id, quantidade: 1 }];
            } else {
                // Se estiver um jogo com o mesmo id, incrementa a quantidade do jogo no carrinho de compras
                return carrinhoJogo.map(jogo => {
                    if (jogo.id === id) {
                        return { ...jogo, quantidade: jogo.quantidade + 1 };
                    } else {
                        // Se o jogo não for o que está sendo incrementado, retorna o jogo sem alterações
                        return jogo;
                    }
                });
            }
        });
    }

    // Função para remover a quantidade de um jogo do carrinho de compras
    function removeGamesQuantity(id: number) {
        setCarrinhoJogo(carrinhoJogo => {
            // Verificando se a quantidade do jogo é 1 para remover o jogo com esse id do carrinho de compras
            if(carrinhoJogo.find(jogo => jogo.id === id)?.quantidade === 1) {
                return carrinhoJogo.filter(jogo => jogo.id !== id);
            } else {
                // Se a quantidade do jogo for maior que 1, decrementa a quantidade do jogo no carrinho de compras
                return carrinhoJogo.map(jogo => {
                    if (jogo.id === id) {
                        return { ...jogo, quantidade: jogo.quantidade - 1 };
                    } else {
                        return jogo;
                    }
                });
            }
        });
    }

    // Função para remover um jogo do carrinho de compras
    function removerDoCarrinho(id: number) {
        setCarrinhoJogo(carrinhoJogo => {
            // Filtrando o carrinho de compras para remover o jogo com o id passado
            return carrinhoJogo.filter(jogo => jogo.id !== id);
        });
    }

    return (
        <CarrinhoContext.Provider value={{ getGamesQuantity, addGamesQuantity, removeGamesQuantity, removerDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}