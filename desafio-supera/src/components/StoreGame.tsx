import { StoreGameType } from '../types/types';
import { Card, Button } from 'react-bootstrap';
import { formataVM } from '../utils/formataVM';
import { useCarrinho } from '../context/carrinhoContext';

export function StoreGame({ id, name, price, image }: StoreGameType) {
    const { getGamesQuantity, addGamesQuantity, removeGamesQuantity, removerDoCarrinho } = useCarrinho();
    const quantidadeSelecionada = getGamesQuantity(id);

    return (
        <Card className='h-100' bg="dark">
            <Card.Img variant="top" src={image} height="220px" style={{ objectFit: 'cover' }}/>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formataVM(price)}</span>
                </Card.Title>

                <div className="mt-auto">
                    {quantidadeSelecionada === 0 ?
                        <Button className='w-100' variant='secondary' onClick={() => addGamesQuantity(id)}>Adicionar ao carrinho</Button>
                    :
                        <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                <Button variant='outline-secondary'size='sm' onClick={() => removeGamesQuantity(id)}>-</Button>

                                <span className='fs-3'>{quantidadeSelecionada}</span> no carrinho

                                <Button variant='outline-secondary'size='sm' onClick={() => addGamesQuantity(id)}>+</Button>
                            </div>
                            
                            <Button variant='danger'size='sm' onClick={() => removerDoCarrinho(id)}>Remover todos do carrinho</Button>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}
