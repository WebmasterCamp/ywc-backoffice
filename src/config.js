const env = process.env.NODE_ENV;

export const API_ENDPOINT =
  env === "development" ? "http://localhost:3000" : "https://api.ywc.in.th";
