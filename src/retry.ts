import { sleep } from './sleep';

interface RetryOptions {
  retries: number;
  delay?: number | ((attempts: number) => number);
}

export const retry =
  ({ retries, delay = 5000 }: RetryOptions) =>
  async <F extends () => Promise<Awaited<ReturnType<F>>>>(
    exec: F
  ): Promise<[Awaited<ReturnType<F>> | undefined, unknown]> => {
    let attempts = 0;
    let result: Awaited<ReturnType<F>> | undefined = undefined;

    while (attempts <= retries) {
      try {
        result = await exec();

        if (result) {
          return [result, null];
        }
      } catch (error) {
        if (attempts === retries) {
          return [undefined, error];
        }
      }

      attempts++;

      if (attempts < retries) {
        await sleep(typeof delay === 'function' ? delay(attempts) : delay);
      }
    }

    return [undefined, new Error('Retry limit reached')];
  };
