const url = "https://deb9-38-25-15-234.ngrok-free.app/api";

export default fetcher = async (path = "", method = "GET", body) => {
  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  });

  if (response.status < 400) {
    return {
      ok: true,
      status: response.status,
      data: await response.json(),
    };
  } else {
    return {
      ok: false,
      status: response.status,
      data: await response.json(),
    };
  }
};