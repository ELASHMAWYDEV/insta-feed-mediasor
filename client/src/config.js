const { hostname, port, protocol } = window.location;

export const SOCKET_URL = `${protocol === "https" ? "wss" : "ws"}://${hostname}:${process.env.NODE_ENV === "production" ? port : 5001}`;