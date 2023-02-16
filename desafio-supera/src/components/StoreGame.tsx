// Importando tipagem de produtos (games)
import { StoreGameType } from '../types/types';
// Imports do Bootstrap
import { Card, Button } from 'react-bootstrap';
// Importando função de formatação de preço
import { formataVM } from '../utils/formataVM';

export function StoreGame({ id, name, price, score, image }: StoreGameType) {
    const quantidadeSelecionada = 0;

    return (
        <Card className='h-100'>
            <Card.Img variant="top" src={image} height="100%" style={{ objectFit: 'cover' }}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formataVM(price)}</span>
                </Card.Title>

                <div className="mt-auto">
                    {
                        quantidadeSelecionada === 0 ?
                            <Button className='w-100'>Adicionar ao carrinho</Button>
                        :
                           <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                                <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                    <Button variant='outline-secondary' size='sm'>-</Button>
                                    <span className='fs-3'>{quantidadeSelecionada}</span> no carrinho
                                    <Button variant='outline-secondary' size='sm'>+</Button>
                                </div>
                                <Button variant='danger' size='sm'>Remover do carrinho</Button>
                            </div>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}
