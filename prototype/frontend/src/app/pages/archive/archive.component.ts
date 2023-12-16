import { Component } from '@angular/core'
import { ArchiveRecord } from '../../../models/contract'
import { CurrencyService } from '../../services/currency.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {
  records: ArchiveRecord[] = []

  constructor(private currencyService: CurrencyService, public datePipe: DatePipe) {
    this.currencyService.availableCurrencyPairsSubject.subscribe(tickers => {
      let availableCodes = tickers.available.map(code => code._id)
      availableCodes.forEach(code => {
        this.currencyService.getArchiveRecords(code)
      })
    })

    this.currencyService.getAvailableCurrencyPairCodes()
    this.currencyService.archiveRecordSubject.subscribe(record => {
      this.records = this.records.filter(value => value._id !== record._id)
      this.records.push(record)
    })
  }
}
