const { host, protocol } = window.location;

export const SOCKET_URL = `${protocol === "https:" ? "wss" : "ws"}://${
  process.env.NODE_ENV === "development" ? "localhost:5001" : host
}`;
