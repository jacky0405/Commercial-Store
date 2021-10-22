export const formatPrice = (cents) => {
    return (cents/1).toLocaleString('zh', {
        style: 'currency',
        currency: 'TWD'
    });
};