export function filterByDate(data, option) {
    return data.filter(d => (
        d.location === option.selected &&
        new Date(d.date) > new Date(Date.now()).setDate(new Date(Date.now()).getDate()-option.range)
    ));
}

export function filterByCountry(data, country) {
    return data.filter(d => (
        d.location === country
    ));
}

export function lastElement(data) {
    if(!data || data.length < 1) return null;
    return data[data.length-1];
}