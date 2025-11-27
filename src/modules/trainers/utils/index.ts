export const validStreetCodeBR = (cep: string): boolean => {
    cep = cep.trim();
    return /^\d{5}-?\d{3}$/.test(cep);
}