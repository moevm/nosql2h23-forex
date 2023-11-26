import { Injectable } from '@angular/core'
import { CurrencyPair } from '../../models/currency-pair.model'
import { STUB_USDRUB } from '../../stubs/usdrub.stub'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  currencyPairSubject: BehaviorSubject<CurrencyPair> = new BehaviorSubject<CurrencyPair>(STUB_USDRUB)

  availableCurrencyPairsSubject: BehaviorSubject<string [] | null> = new BehaviorSubject<string[] | null>(null)

  constructor(private httpService: HttpClient) {
  }

  getCurrencyPairInfo(code: string) {
    this.httpService.get<CurrencyPair>(environment.URLS.getCurrencyPairInfo(code)).subscribe(this.currencyPairSubject.next)
  }

  getAvailableCurrencyPairCodes() {
    this.httpService.get<string []>(environment.URLS.getAvailableCurrencyPairCodes()).subscribe(this.availableCurrencyPairsSubject.next)
  }


}
