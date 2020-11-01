const env = process.env.REACT_APP_API_DEV

export const API_ENDPOINT =
  env === 'true'
    ? 'https://api-staging.ywc18.ywc.in.th/'
    : 'https://api-prod.ywc18.ywc.in.th'
