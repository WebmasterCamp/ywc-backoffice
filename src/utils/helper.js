export const getQueryParam = id => {
  const location = window.location.href.replace("/#/", "").replace("#/", "");
  const url = new URL(location);
  return url.searchParams.get(id);
};
