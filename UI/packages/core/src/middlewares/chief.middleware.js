const chief = getSlaves => store => {
    const slaves = getSlaves(store);
    return next => action => slaves(next)(action);
};

export default chief;
