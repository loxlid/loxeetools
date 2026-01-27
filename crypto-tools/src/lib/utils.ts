export const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null) return '0.00';
    if (price === 0) return '0.00';
    
    // For tokens with price < 1, show up to 8 decimal places
    if (price < 1) {
        return price.toLocaleString('en-US', { maximumFractionDigits: 8 });
    }
    
    // For tokens with price >= 1, show standard 2 decimal places
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
