export const validate = (
  params: Record<string, unknown>,
  schema: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'enum';
      enum?: string[];
      nullable?: boolean;
      required?: boolean;
    }
  >
) => {
  const keys = Object.keys(schema);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (params[key] === undefined) {
      return {
        error: `Parameter (${key}) is required`,
      };
    } else if (
      !(schema[key].nullable && params[key] === null) &&
      schema[key].type !== 'enum' &&
      typeof params[key] !== schema[key].type
    ) {
      return {
        error: `Parameter (${key}) type need ${schema[key]}`,
      };
    } else if (
      schema[key].type === 'enum' &&
      !schema[key].enum?.includes(params[key] as string)
    ) {
      return {
        error: `Parameter (${key}) need one of (${schema[
          key
        ].toString()}), but got ${params[key]}`,
      };
    } else if (schema[key].required) {
      if (
        schema[key].type === 'string' &&
        typeof params[key] === 'string' &&
        params[key].trim() === ''
      ) {
        return {
          error: `Parameter (${key}) is required`,
        };
      } else if (
        schema[key].type === 'number' &&
        typeof params[key] === 'number' &&
        params[key] === 0
      ) {
        return {
          error: `Parameter (${key}) is required`,
        };
      }
    }
  }

  return {
    error: null,
  };
};

export const allowed = (
  params: Record<string, unknown>,
  schema: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'enum';
      enum?: string[];
      nullable?: boolean;
    }
  >
) => {
  const keys = Object.keys(params);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    if (!Object.keys(schema).includes(key)) {
      return {
        error: `Parameter (${key}) is not allowed`,
      };
    } else if (
      !(schema[key].nullable && params[key] === null) &&
      schema[key].type !== 'enum' &&
      typeof params[key] !== schema[key].type
    ) {
      return {
        error: `Parameter (${key}) type need ${schema[key]}`,
      };
    } else if (
      schema[key].type === 'enum' &&
      !schema[key].enum?.includes(params[key] as string)
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
