export const createAction = (emitter, token) => {
    const resultFn = function(...args) {
        emitter.emit(token, ...args);
    };

    resultFn.toString = () => token;

    resultFn.on = (cb) => {
        return emitter.on(token, cb);
    };

    return resultFn;
};
