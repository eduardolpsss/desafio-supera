// Formata um valor monetário para o padrão brasileiro
const VM_FORMATER = new Intl.NumberFormat(undefined, { currency: 'BRL', style: 'currency' });

export function formataVM(number: number) {
    return VM_FORMATER.format(number);
}