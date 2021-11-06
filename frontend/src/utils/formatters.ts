export function formatPrice(n: number | null, currency?: string): string {
    if (n === null || n === undefined) {
        return '';
    }
    if (currency) {
        return n.toLocaleString("en-US", {
            style: "currency",
            currency: currency,
        });
    } else {
        return n.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}
