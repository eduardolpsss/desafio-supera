import { createContext, useContext, ReactNode, useState  } from "react";
// Importando componente carrinho de compras modal
import { ModalCarrinho } from "../components/ModalCarrinho";

// Tipagem do provider do carrinho de compras (children é o que vai ser renderizado dentro do provider)
type CarrinhoProviderProps = {
    // Tipo que aceita qualquer coisa que o React aceite como filho
    children: ReactNode;
}

// Tipagem do jogo no carrinho de compras (id do jogo e quantidade)
type CarrinhoJogo = {
    id: number;
    quantidade: number;
}

// Tipagem de funções que serão passadas para o contexto do carrinho de compras
type CarrinhoContextData = {
    /*
        Funções para pegar a quantidade de um jogo no carrinho de compras, adicionar a quantidade de um jogo no carrinho de compras, remover a quantidade de um jogo no carrinho de compras e remover um jogo do carrinho de compras    
    */
    getGamesQuantity: (id: number) => number;
    addGamesQuantity: (id: number) => void;
    removeGamesQuantity: (id: number) => void;
    removerDoCarrinho: (id: number) => void;

    /*
        Funções referentes a modal do carrinho (abrir e fechar)
    */
    abrirModalCarrinho: () => void;
    fecharModalCarrinho: () => void;
    quantidadeTotalNoCarrinho: number;
    carrinhoJogos: CarrinhoJogo[];
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
    const [carrinhoJogos, setCarrinhoJogos] = useState<CarrinhoJogo[]>([]);

    // Usando o hook useState para abrir e fechar a modal do carrinho de compras
    const [modalCarrinhoAberto, setModalCarrinhoAberto] = useState(false);
    
    // Função para abrir a modal do carrinho de compras
    const abrirModalCarrinho = () => setModalCarrinhoAberto(true);

    // Função para fechar a modal do carrinho de compras
    const fecharModalCarrinho = () => setModalCarrinhoAberto(false);

    // Função para pegar a quantidade total de itens no carrinho de compras
    const quantidadeTotalNoCarrinho = carrinhoJogos.reduce((quantidade, jogo) => jogo.quantidade + quantidade, 0);

    // Função para pegar a quantidade de um jogo no carrinho de compras
    function getGamesQuantity(id: number) {
        return carrinhoJogos.find(jogo => jogo.id === id)?.quantidade || 0;
    }

    // Função para adicionar a quatidade de um jogo no carrinho de compras
    function addGamesQuantity(id: number) {
        setCarrinhoJogos(carrinhoJogos => {
            // Verificando se o jogo já está no carrinho de compras
            if (carrinhoJogos.find(jogo => jogo.id === id) == null) {
                // Se não estiver, adiciona o jogo no carrinho de compras
                return [...carrinhoJogos, { id, quantidade: 1 }];
            } else {
                // Se estiver um jogo com o mesmo id, incrementa a quantidade do jogo no carrinho de compras
                return carrinhoJogos.map(jogo => {
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
        setCarrinhoJogos(carrinhoJogos => {
            // Verificando se a quantidade do jogo é 1 para remover o jogo com esse id do carrinho de compras
            if(carrinhoJogos.find(jogo => jogo.id === id)?.quantidade === 1) {
                return carrinhoJogos.filter(jogo => jogo.id !== id);
            } else {
                // Se a quantidade do jogo for maior que 1, decrementa a quantidade do jogo no carrinho de compras
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

    // Função para remover um jogo do carrinho de compras
    function removerDoCarrinho(id: number) {
        setCarrinhoJogos(carrinhoJogos => {
            // Filtrando o carrinho de compras para remover o jogo com o id passado
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
            {/* Render do modal do carrinho de compras */}
            <ModalCarrinho modalCarrinhoAberto={modalCarrinhoAberto} />
        </CarrinhoContext.Provider>
    );
}