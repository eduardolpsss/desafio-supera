import { JogoNoCarrinhoProps } from "../types/types";
import { useCarrinho } from "../context/carrinhoContext"
import storeGames from "../data/products.json"
import { Button, Stack } from 'react-bootstrap';
import { formataVM } from "../utils/formataVM";

export function JogoNoCarrinho({ id, quantidade }: JogoNoCarrinhoProps) {
    const { removeGamesQuantity } = useCarrinho();
    const jogo = storeGames.find(jogo => jogo.id === id);
    
    if(jogo== null) return null;

    return (
        <Stack direction="horizontal" gap={2}>
            <img src={jogo?.image} alt={jogo?.name} width="70" height="70" style={{ objectFit: 'cover' }}/>

            <div className="me-auto">
                {jogo?.name}{" "}{quantidade > 1 && (<span className="text-muted">{quantidade}x</span>)}
            </div>
            
            <div className="text-muted">
                {formataVM(jogo.price)}
            </div>
            
            <div>
                {formataVM(jogo.price * quantidade)}
            </div>

            <Button variant="outline-danger" size="sm" onClick={() => removeGamesQuantity(jogo.id)}>X</Button>
        </Stack>
    );
}