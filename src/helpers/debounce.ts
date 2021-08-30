// eslint-disable-next-line
export function debounce<F extends (...args: any) => any>(func: F, waitMs = 300) {
    let timeout: NodeJS.Timeout;

    // eslint-disable-next-line
    const debounced = (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitMs);
    };

    return debounced as (...args: Parameters<F>) => ReturnType<F>;
}
