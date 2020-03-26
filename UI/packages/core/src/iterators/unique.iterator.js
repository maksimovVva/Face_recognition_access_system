const uniqueIterator = function({ min = 0 } = {}) {
    let counter = min;

    return {
        next: function() {
            return counter++;
        },
        done: false
    };
};

export default uniqueIterator;
