const env = process.env.NODE_ENV

export const API_ENDPOINT =
  env === 'development'
    ? 'https://api-staging.ywc.in.th'
    : 'https://api.ywc.in.th'

// export const API_ENDPOINT = 'https://api.ywc.in.th'
