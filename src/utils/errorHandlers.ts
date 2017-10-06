function handleApiError (err: Error) {
  throw new Error(err.message);
}

export {
  handleApiError,
};
