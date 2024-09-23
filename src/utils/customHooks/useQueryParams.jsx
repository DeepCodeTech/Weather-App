// since we are not using Router component in this I am writing a custom logic to manipulate query params
export const getQueryParams = () => {
  return new URLSearchParams(window.location.search);
};

export const setQueryParams = (params, reset = false) => {
  const url = new URL(window.location);

  if (reset) {
    url.search = "";
  } else {
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key]);
    });
  }

  window.history.pushState({}, "", url);
};
