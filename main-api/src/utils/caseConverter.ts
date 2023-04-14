function snakeToCamel(obj: any) {
    const result = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
            result[newKey] = obj[key];
        }
    }
    return result;
}

const camelToSnake = (obj: any) => {
    const result = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
            result[newKey] = obj[key];
        }
    }
    return result;
}


export default {
    camelToSnake,
    snakeToCamel
}