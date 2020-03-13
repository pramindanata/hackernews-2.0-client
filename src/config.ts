export default {
  app: {
    apiServer: process.env.REACT_APP_API_SERVER || 'http://localhost:3000/api',
    apiServerReal:
      process.env.REACT_APP_API_SERVER_REAL || 'http://localhost:4000',
  },
  css: {
    lgBreakpoint: 992,
  },
}
