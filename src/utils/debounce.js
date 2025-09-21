export default function debounce(fn, delay) {
    let timer;
    const debounced = (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
    };
    return debounced;
}
