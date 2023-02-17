// Importando tipagem de produtos (games)
import { StoreGameType } from '../types/types';
// Imports do Bootstrap
import { Card, Button } from 'react-bootstrap';
// Importando função de formatação de preço para BRL
import { formataVM } from '../utils/formataVM';
// Importando contexto do carrinho de compras
import { useCarrinho } from '../context/carrinhoContext';

export function StoreGame({ id, name, price, score, image }: StoreGameType) {
    // Pegando funções do contexto do carrinho de compras
    const { getGamesQuantity, addGamesQuantity, removeGamesQuantity, removerDoCarrinho } = useCarrinho();
    // Pegando a quantidade de um jogo no carrinho de compras de forma dinâmica
    const quantidadeSelecionada = getGamesQuantity(id);

    return (
        <Card className='h-100'>
            {/* Imagem do game */}
            <Card.Img variant="top" src={image} height="100%" style={{ objectFit: 'cover' }}/>
            {/* Body com nome, preço do game formatado pela função formataVM (BRL) - utils/formataVM.ts */}
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formataVM(price)}</span>
                </Card.Title>

                {/* Botão de adicionar ao carrinho */}
                <div className="mt-auto">
                    {
                        quantidadeSelecionada === 0 ?
                            // Botão de adicionar ao carrinho com a função addGamesQuantity (context/carrinhoContext.tsx)
                            <Button className='w-100' onClick={() => addGamesQuantity(id)}>Adicionar ao carrinho</Button>
                        :
                        <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                {/* Botão de remover um jogo do carrinho de compras com a função removeGamesQuantity (context/carrinhoContext.tsx) */}
                                <Button variant='outline-secondary' size='sm' onClick={() => removeGamesQuantity(id)}>-</Button>
                                <span className='fs-3'>{quantidadeSelecionada}</span> no carrinho
                                <Button variant='outline-secondary' size='sm' onClick={() => addGamesQuantity(id)}>+</Button>
                            </div>
                            {/* Botão de remover um jogo do carrinho de compras com a função removerDoCarrinho (context/carrinhoContext.tsx) */}
                            <Button variant='danger' size='sm' onClick={() => removerDoCarrinho(id)}>Remover todos do carrinho</Button>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}
