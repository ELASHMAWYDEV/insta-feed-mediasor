
export const SOCKET_URL = process.env.NODE_ENV == "production" ? `${window.location.origin}:5001` : "http://localhost:5001";