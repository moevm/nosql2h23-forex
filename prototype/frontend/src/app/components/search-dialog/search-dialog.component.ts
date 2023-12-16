import { Component, OnDestroy, OnInit } from '@angular/core'
import { Code } from '../../../models/contract'
import { CurrencyService } from '../../services/currency.service'
import { BehaviorSubject, debounceTime, fromEvent, Subscription } from 'rxjs'


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  visible: boolean = false
  availableCurrencyPairCodes: Code[]

  selectedCurrencyPairCode: Code

  requestSubscription: Subscription

  constructor(private currencyService: CurrencyService) {
    this.visibleSubject.subscribe(value => this.visible = value)
  }

  showDialog() {
    this.visibleSubject.next(true)
  }

  ngOnInit() {
    this.currencyService.getAvailableCurrencyPairCodes()

    this.currencyService.availableCurrencyPairsSubject.subscribe(currencyCodes => {
      this.availableCurrencyPairCodes = currencyCodes.available
    })

    this.visibleSubject.pipe(debounceTime(0)).subscribe((isVisible) => {
      if (isVisible) {
        const listElement = document.querySelectorAll('.currency-codes-list li')
        const clickInCodesList = fromEvent(listElement, 'click')

        this.requestSubscription = clickInCodesList.subscribe(() => {
          this.currencyService.setCode(this.selectedCurrencyPairCode._id)
          this.currencyService.getCurrencyPairGraph()
          this.visibleSubject.next(false)
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe()
  }
}
