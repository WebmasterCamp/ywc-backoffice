const env = process.env.NODE_ENV;

// export const API_ENDPOINT =
//   env === "development" ? "http://localhost:3000" : "https://api.ywc.in.th";

export const API_ENDPOINT =
  env === "development" ? "https://api.ywc.in.th" : "https://api.ywc.in.th";
