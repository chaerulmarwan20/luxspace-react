const addClass = (e, classes) =>
  e.classList && e.classList.add(...classes.split(" "));

const removeClass = (e, classes) =>
  e.classList && e.classList.remove(...classes.split(" "));

const fetchData = ({
  url,
  method = "GET",
  host = process.env.REACT_APP_API_HOST,
}) => {
  return fetch(`${host}${url}`, {
    method,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    const jsonResponse = await response.json();
    if (response.ok) return jsonResponse;
    throw new Error(JSON.stringify(jsonResponse));
  });
};

export { addClass, removeClass, fetchData };
