export const validate = (
  params: Record<string, unknown>,
  schema: Record<string, 'string' | 'number' | 'boolean' | string[]>
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
      typeof params[key] === 'string' &&
      Array.isArray(schema[key]) &&
      !schema[key].includes(params[key] as string)
    ) {
      return {
        error: `Parameter (${key}) need one of (${schema[
          key
        ].toString()}), but got ${params[key]}`,
      };
    }
  }

  return {
    error: null,
  };
};
