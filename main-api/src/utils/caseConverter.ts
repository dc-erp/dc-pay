const snakeToCamel = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      result[newKey] = value;
    }

    return result;
  }
  
  const camelToSnake = <T extends Record<string, any>>(obj: T): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
      result[newKey] = value;
    }

    return result;
  }
  
  export default {
    camelToSnake,
    snakeToCamel
  };
