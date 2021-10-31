const addClass = (e, classes) =>
  e.classList && e.classList.add(...classes.split(" "));

const removeClass = (e, classes) =>
  e.classList && e.classList.remove(...classes.split(" "));

const fetchData = ({
  url,
  method = "GET",
  host = process.env.REACT_APP_API_HOST,
  body,
}) => {
  return fetch(`${host}${url}`, {
    method,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (res) => {
    const statusHasResponse = [200, 404];
    const jsonRes = statusHasResponse.includes(res.status)
      ? await res.json()
      : res;
    if (res.ok) return jsonRes;
    throw new Error(JSON.stringify(jsonRes));
  });
};

export { addClass, removeClass, fetchData };
