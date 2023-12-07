export const environment = {
  production: true,

  BACKEND_DOMAIN: 'http://localhost:8000/viewer/',

  URLS: {
    getCurrencyPairInfo(code: string) {
      return `${environment.BACKEND_DOMAIN}show/${code.toUpperCase()}`
    },
    getCurrencyPairArchiveInfo(code: string) {
      return `${environment.BACKEND_DOMAIN}archive/${code.toUpperCase()}`
    },
    getAvailableCurrencyPairCodes() {
      return `${environment.BACKEND_DOMAIN}codes`
    },
  },
}
