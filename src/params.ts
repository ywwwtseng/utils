export const validate = (
  params: Record<string, unknown>,
  schema: Record<string, 'string' | 'number' | 'boolean' | string[]>
) => {
  const keys = Object.keys(schema);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (params[key] === undefined) {
      return {
        error: `Parameter (${key}) is required`,
      };
    } else if (
      typeof schema[key] === 'string' &&
      typeof params[key] !== schema[key]
    ) {
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

export const allowed = (
  params: Record<string, unknown>,
  schema: Record<string, 'string' | 'number' | 'boolean' | string[]>
) => {
  const keys = Object.keys(params);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (!Object.keys(schema).includes(key)) {
      return {
        error: `Parameter (${key}) is not allowed`,
      };
    } else if (
      typeof schema[key] === 'string' &&
      typeof params[key] !== schema[key]
    ) {
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
