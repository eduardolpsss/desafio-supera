// Importando os types necessários
import { JogoNoCarrinhoProps } from "../types/types";

import { useCarrinho } from "../context/carrinhoContext"
// Importando JSON de produtos
import storeGames from "../data/products.json"
// Imports do Bootstrap
import { Button, Stack } from 'react-bootstrap';
import { formataVM } from "../utils/formataVM";

export function JogoNoCarrinho({ id, quantidade }: JogoNoCarrinhoProps) {
    const { removeGamesQuantity } = useCarrinho();
    const jogo = storeGames.find(jogo => jogo.id === id);
    
    // Se o jogo não existir, retorna null
    if(jogo== null) return null;

    return (
        // Render dos jogos selecionados no carrinho de compras
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