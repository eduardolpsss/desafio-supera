import { ReactNode } from "react";

export type StoreGameType = {
    id: number;
    name: string;
    price: number;
    image: string;
};

export type CarrinhoProviderProps = {
    children: ReactNode;
}

export type CarrinhoJogo = {
    id: number;
    quantidade: number;
}

export type CarrinhoContextData = {
    getGamesQuantity: (id: number) => number;
    addGamesQuantity: (id: number) => void;
    removeGamesQuantity: (id: number) => void;
    removerDoCarrinho: (id: number) => void;

    abrirModalCarrinho: () => void;
    fecharModalCarrinho: () => void;

    quantidadeTotalNoCarrinho: number;
    carrinhoJogos: CarrinhoJogo[];
}

export type JogoNoCarrinhoProps = {
    id: number;
    quantidade: number;
}

export type ModalCarrinhoProps = {
    modalCarrinhoAberto: boolean;
}