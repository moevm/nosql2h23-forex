import { Component, OnDestroy, OnInit } from '@angular/core'
import { CurrencyService } from './services/currency.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend'

  private bootstrapAppSubscription: Subscription

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.bootstrapAppSubscription = this.currencyService.bootstrapApp()
  }

  ngOnDestroy(): void {
    this.bootstrapAppSubscription.unsubscribe()
  }
}
