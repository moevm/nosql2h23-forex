import { Injectable } from '@angular/core'
import { CurrencyPair, Tickers } from '../../models/contract'
import { STUB_USDRUB } from '../../stubs/usdrub.stub'
import { BehaviorSubject, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  currencyPairSubject: BehaviorSubject<CurrencyPair> = new BehaviorSubject<CurrencyPair>(STUB_USDRUB)

  availableCurrencyPairsSubject: Subject<Tickers> = new Subject<Tickers>()

  constructor(private httpService: HttpClient) {
  }

  getCurrencyPairInfo(code: string) {
    this.httpService.get<CurrencyPair>(environment.URLS.getCurrencyPairInfo(code)).subscribe((currencyPair) => this.currencyPairSubject.next(currencyPair))
  }

  getAvailableCurrencyPairCodes() {
    this.httpService.get<Tickers>(environment.URLS.getAvailableCurrencyPairCodes()).subscribe((tickers) => this.availableCurrencyPairsSubject.next(tickers))
  }


}
