import { Component, OnInit } from '@angular/core'
import { Code } from '../../../models/contract'
import { CurrencyService } from '../../services/currency.service'
import { asyncScheduler, BehaviorSubject, debounceTime, fromEvent } from 'rxjs'


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  visible: boolean = false
  availableCurrencyPairCodes: Code[]

  selectedCurrencyPairCode: Code

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

    this.visibleSubject.pipe(debounceTime(0, asyncScheduler)).subscribe((isVisible) => {
      if (isVisible) {
        const listElement = document.querySelector('.currency-codes-list li') as Element

        const clickInCodesList = fromEvent(listElement, 'click')

        clickInCodesList.subscribe(() => {
          this.currencyService.setCode(this.selectedCurrencyPairCode._id)
          this.currencyService.getCurrencyPairGraph()
          this.visibleSubject.next(false)
        })
      }
    })
  }

}
