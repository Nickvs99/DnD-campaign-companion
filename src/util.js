export function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function randomUniform(min, max) {
    return Math.random() * (max - min) + min;
}

export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
};