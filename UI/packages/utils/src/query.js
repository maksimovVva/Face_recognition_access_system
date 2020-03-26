const buildQueryParams = key => array =>
    array.map(e => `&${key}=${e}`).join("");

export { buildQueryParams };
