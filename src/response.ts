export interface ErrorResponse {
  error: string;
  message: string;
  error_code: number;
  info?: Record<string, unknown>;
}

export const errorToResponse = (error: unknown) => {
  let error_code = 50001;
  let status = 500;
  let message = 'Unknown error';
  let info = undefined;

  if (error !== null && typeof error === 'object') {
    if ('status' in error) {
      if (typeof error.status === 'number') {
        status = error.status;
      }
    }

    if ('message' in error && typeof error.message === 'string') {
      message = error.message;
    } else {
      message = JSON.stringify(error);
    }

    if ('cause' in error) {
      if (typeof error.cause === 'object') {
        if ('code' in error.cause && typeof error.cause.code === 'number') {
          error_code = error.cause.code;
        }

        if ('info' in error.cause && error.cause.info) {
          info = error.cause.info;
        }
      }
    }
  }

  return Response.json(
    {
      error,
      message,
      error_code,
      info,
    },
    { status }
  );
};
