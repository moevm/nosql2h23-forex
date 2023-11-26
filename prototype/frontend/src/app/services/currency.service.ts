import { Injectable } from '@angular/core'
import { CurrencyPair } from '../../models/currency-pair.model'
import { STUB_USDRUB } from '../../stubs/usdrub.stub'
import { BehaviorSubject, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  currencyPairSubject: BehaviorSubject<CurrencyPair> = new BehaviorSubject<CurrencyPair>(STUB_USDRUB)

  availableCurrencyPairsSubject: Subject<{
    'available':
      { '_id': string }[]
  }>

  constructor(private httpService: HttpClient) {
  }

  getCurrencyPairInfo(code: string) {
    this.httpService.get<CurrencyPair>(environment.URLS.getCurrencyPairInfo(code)).subscribe(this.currencyPairSubject.next)
  }

  getAvailableCurrencyPairCodes() {
    this.httpService.get<{
      'available':
        { '_id': string }[]
    }>(environment.URLS.getAvailableCurrencyPairCodes()).subscribe(this.availableCurrencyPairsSubject.next)
  }


}
