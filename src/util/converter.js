export function convert(n) {
    if(n > 1000000) return (n/1000000).toFixed(2)+" M";
    if(n > 5000) return (n/1000).toFixed(2)+" K";
    return n;
}

export function addSpaces(n) {
    return parseInt(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function toLocalDate(d) {
    const options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric' 
    };
    return new Date(d).toLocaleDateString('fr-FR', options);
}

export function toCompactDate(d) {
    const options = { 
        month: 'numeric',
        day: 'numeric' 
    };
    return new Date(d).toLocaleDateString(undefined, options);
}