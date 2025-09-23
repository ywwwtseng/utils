export const errorToResponse = (error: unknown) => {
  let status = 500;
  let message = 'Unknown error';

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
  }

  return Response.json(
    {
      error: message,
    },
    { status }
  );
};
