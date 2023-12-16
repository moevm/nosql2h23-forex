import { Injectable } from '@angular/core'
import { GraphData, Periods, Tickers } from '../../models/contract'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
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
  availablePeriods: Subject<Periods> = new Subject<Periods>()

  constructor(private httpService: HttpClient) {
  }

  //getCurrencyPairInfo(code: string) {
  //  this.httpService.get<CurrencyPair>(environment.URLS.getCurrencyPairInfo(code)).subscribe((currencyPair) => this.currencyPairSubject.next(currencyPair))
  //}

  getCurrencyPairGraph() {
    this.httpService.get<GraphData[]>(environment.URLS.getCurrencyPairGraph(this.code, this.dateRange.dateFrom, this.dateRange.dateTo, this.frequency)).subscribe((currencyPair) => {
      console.log(currencyPair)
      this.currencyPairSubject.next(currencyPair)
    })
  }

  getAvailableCurrencyPairCodes() {
    this.httpService.get<Tickers>(environment.URLS.getAvailableCurrencyPairCodes()).subscribe((tickers) => this.availableCurrencyPairsSubject.next(tickers))
  }

  getAvailablePeriods() {
    this.httpService.get<Periods>(environment.URLS.getAvailablePeriods()).subscribe((periods) => this.availablePeriods.next(periods))
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


}
