export const validate = (
  params: { [key: string]: any },
  schema: { [key: string]: 'string' | 'number' | 'boolean' | string[] }
) => {
  const missing: string[] = [];
  const keys = Object.keys(schema);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (params[key] === undefined) {
      missing.push(key);
    }
  }

  if (missing.length !== 0) {
    return {
      error: `Missing parameters (${missing.toString()})`,
    };
  }

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (typeof schema[key] === 'string' && typeof params[key] !== schema[key]) {
      return {
        error: `Parameter (${key}) type need ${schema[key]}`,
      };
    } else if (
      Array.isArray(schema[key]) &&
      !schema[key].includes(params[key])
    ) {
      return {
        error: `Parameter (${key}) need one of (${schema[key].toString()})`,
      };
    }
  }

  return {
    error: null,
  };
};
