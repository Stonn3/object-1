const isEmpty = obj => {
    if (obj === undefined || obj === null) {
        return true;
    }
    
    if (typeof obj === 'number' && isNaN(obj)) {
        return true;
    }

    if (Object.keys(obj).length === 0) {
        return true;
    }

    return false;
};

const without = (obj, ...keysToRemove) => {
    const newObj = {};

    Object.entries(obj).forEach(([key, value]) => {
        if (!keysToRemove.includes(key)) {
            newObj[key] = value;
        }
    });

    return newObj;
};

const isEmptyDeep = obj => {
    if (obj === undefined || obj === null || isNaN(obj) || (typeof obj === 'string' && obj.trim() === '')) {
        return true;
    }

    if (typeof obj !== 'object') {
        return false;
    }

    for (const value of Object.values(obj)) {
        if (!isEmptyDeep(value)) {
            return false;
        }
    }

    return true;
};

const intersection = (...objects) => {
    return objects.reduce((acc, obj) => {
        for (const [key, value] of Object.entries(obj)) {
            if (acc.hasOwnProperty(key) && acc[key] !== value) {
                delete acc[key];
            }
        }
        return acc;
    }, {});
};

const intersectionDeep = (...objects) => {
    if (objects.length === 0) {
        return {};
    }

    const [first, ...rest] = objects;

    if (objects.length === 1) {
        return first;
    }

    if (typeof first !== 'object' || Array.isArray(first)) {
        return {};
    }

    const result = {};

    for (const [key, value] of Object.entries(first)) {
        if (rest.every(obj => typeof obj === 'object' && !Array.isArray(obj) && obj.hasOwnProperty(key))) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                const intersectionValue = intersectionDeep(...rest.map(obj => obj[key]));
                if (Object.keys(intersectionValue).length > 0) {
                    result[key] = intersectionValue;
                }
            } else {
                result[key] = value;
            }
        }
    }

    return result;
};
