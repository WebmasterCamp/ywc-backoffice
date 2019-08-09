const env = process.env.REACT_APP_API_DEV

export const API_ENDPOINT =
  env === 'true' ? 'https://api-staging.ywc.in.th' : 'https://api.ywc.in.th'
