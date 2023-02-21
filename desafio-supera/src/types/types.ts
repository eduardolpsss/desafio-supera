// Tipagem dos dados dos jogos vindos da API
export type StoreGameType = {
    id: number;
    name: string;
    price: number;
    score: number;
    image: string;
};

// Path: desafio-supera/src/context/carrinhoContext.tsx

// Tipagem do provider do carrinho de compras (children é o que vai ser renderizado dentro do provider)
export type CarrinhoProviderProps = {
    // Tipo que aceita qualquer coisa que o React aceite como filho
    children: ReactNode;
}

// Tipagem do jogo no carrinho de compras (id do jogo e quantidade)
export type CarrinhoJogo = {
    id: number;
    quantidade: number;
}

// Tipagem de funções que serão passadas para o contexto do carrinho de compras
export type CarrinhoContextData = {
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

// Path: desafio-supera/src/components/JogosNoCarrinho.tsx

export type JogoNoCarrinhoProps = {
    id: number;
    quantidade: number;
}

// Path: desafio-supera/src/components/ModalCarrinho.tsx

export type ModalCarrinhoProps = {
    modalCarrinhoAberto: boolean;
}