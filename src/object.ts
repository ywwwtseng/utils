export const isObject = (obj: any) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj); 
};

export function update<T extends Record<string, any>>(
  obj: T,
  path: string | string[],
  value: any
): T {
  path = typeof path === 'string' ? [path] : path;

  if (path.length === 0) return obj;
  const [key, ...rest] = path;
  return {
    ...obj,
    [key]: rest.length > 0
      ? update(obj[key] ?? {}, rest, value)
      : value,
  };
};

export const get = (obj: Record<string, any>, path: string | string[], callback?: any) => {
  const keys = typeof path === 'string' ? path.split('.') : path;

  let anchor: any = obj;

  for (let i = 0; i < keys.length; i++) {
    anchor = anchor[keys[i]];

    if (anchor === undefined) {
      return callback ?? undefined;
    }
  }

  return anchor;
};

export const prune = (src: Record<string, unknown>): Record<string, unknown> => {
  const obj: Record<string, unknown> = {};

  for (const key in src) {
    const value = src[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      obj[key] = prune(value as Record<string, unknown>);
    } else {
      obj[key] = value;
    }
  }

  return obj;
};

export const merge = (target: any, ...sources: any[]) => {
  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!isObject(targetValue)) {
          target[key] = {};
        }
        merge(target[key], sourceValue);
      } else {
        target[key] = sourceValue;
      }
    }
  }

  return target;
};
