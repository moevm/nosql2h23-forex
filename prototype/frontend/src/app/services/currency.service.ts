import { Injectable } from '@angular/core'
import { ArchiveRecord, GraphData, ImportStatus, Periods, Tickers } from '../../models/contract'
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment.development'


type DateRange = {
  dateFrom: Date
  dateTo: Date
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencyPairSubject: Subject<GraphData[]> = new Subject<GraphData[]>()

  dateRange: DateRange
  frequency: string
  code: string

  availableCurrencyPairsSubject: Subject<Tickers> = new Subject<Tickers>()
  archiveRecordSubject: Subject<ArchiveRecord> = new Subject<ArchiveRecord>()
  availablePeriods: Subject<Periods> = new Subject<Periods>()


  constructor(private httpService: HttpClient) {
  }

  //getCurrencyPairInfo(code: string) {
  //  this.httpService.get<CurrencyPair>(environment.URLS.getCurrencyPairInfo(code)).subscribe((currencyPair) => this.currencyPairSubject.next(currencyPair))
  //}

  getCurrencyPairGraph() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    }

    this.httpService.get<GraphData[]>(environment.URLS.getCurrencyPairGraph(this.code, this.dateRange.dateFrom, this.dateRange.dateTo, this.frequency), httpOptions).subscribe((currencyPair) => {
      this.currencyPairSubject.next(currencyPair)
    })
  }

  getAvailableCurrencyPairCodes() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    }

    this.httpService.get<Tickers>(environment.URLS.getAvailableCurrencyPairCodes(), httpOptions).subscribe((tickers) => this.availableCurrencyPairsSubject.next(tickers))
  }

  getArchiveRecords(code: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    }

    return this.httpService.get<ArchiveRecord[]>(environment.URLS.getArchiveRecord(code), httpOptions).subscribe(record => this.archiveRecordSubject.next(record[0]))
  }

  getAvailablePeriods() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    }

    this.httpService.get<Periods>(environment.URLS.getAvailablePeriods(), httpOptions).subscribe((periods) => this.availablePeriods.next(periods))
  }


  setDateRange(dateFrom: Date, dateTo: Date) {
    this.dateRange = {
      dateFrom,
      dateTo,
    }
  }

  setFrequency(frequency: string) {
    this.frequency = frequency
  }

  setCode(code: string) {
    this.code = code
  }

  importCfg(fileToImport: File): Observable<ImportStatus> {
    const formData = new FormData()
    formData.append('file', fileToImport)

    return this.httpService.put<ImportStatus>(environment.URLS.importCfg(), {
      formData, headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    })
  }

  exportCfg(): Observable<any> {
    return this.httpService.get(environment.URLS.exportCfg(), {
      observe: 'response', responseType: 'blob', headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    })
  }


}
