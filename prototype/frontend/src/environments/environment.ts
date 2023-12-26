export const environment = {
  production: true,

  BACKEND_DOMAIN: 'http://nosql_backend:8000/viewer/',

  URLS: {
    bootstrapApp() {
      return environment.BACKEND_DOMAIN
    },
    getCurrencyPairInfo(code: string) {
      return `${environment.BACKEND_DOMAIN}show/${code.toUpperCase()}`
    },
    getCurrencyPairGraph(code: string, startDate: Date, endDate: Date, frequency: string) {
      return `${environment.BACKEND_DOMAIN}graph/${code.toUpperCase()}/${startDate.toISOString().replace('.000Z', '')}/${endDate.toISOString().replace('.000Z', '')}/${frequency}/`
    },
    getCurrencyPairArchiveInfo(code: string) {
      return `${environment.BACKEND_DOMAIN}archive/${code.toUpperCase()}`
    },
    getAvailableCurrencyPairCodes() {
      return `${environment.BACKEND_DOMAIN}codes`
    },
    getAvailablePeriods() {
      return `${environment.BACKEND_DOMAIN}periods`
    },
    getArchiveRecord(code: string) {
      return `${environment.BACKEND_DOMAIN}archive/${code.toUpperCase()}/`
    },
    importCfg() {
      return `${environment.BACKEND_DOMAIN}import/`
    },
    exportCfg() {
      return `${environment.BACKEND_DOMAIN}export/`
    },
  },
}
