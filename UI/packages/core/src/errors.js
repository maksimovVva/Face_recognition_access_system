function handleFetchError(response) {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(text);
        })
    }

    return response;
}

export { handleFetchError };
