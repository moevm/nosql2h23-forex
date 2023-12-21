import { AfterViewInit, Component, OnInit } from '@angular/core'
import { CurrencyService } from '../../services/currency.service'
import { GraphData } from '../../../models/contract'
import { FormControl, FormGroup } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { fromEvent } from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  currencyPairDataset: GraphData[]

  minDate: Date = new Date('2010-01-01T00:00:00')
  maxDate: Date = new Date('2010-04-01T00:00:00')

  selectedCode: string
  selectedFrequency: string

  availablePeriods: {
    value: string
  }[]

  data: any
  options: any
  dateFormGroup = new FormGroup({
    dateFrom: new FormControl<Date>(new Date('2010-02-02T00:00:00')),
    dateTo: new FormControl<Date>(new Date('2010-03-02T00:00:00')),
  })

  constructor(private currencyService: CurrencyService, public datePipe: DatePipe) {
    this.currencyService.availablePeriods.subscribe(periods => {
      this.availablePeriods = periods.available.map(str => ({
        value: str,
      }))
    })

    this.currencyService.getAvailablePeriods()

    this.currencyService.currencyPairSubject.subscribe(() => {
      this.selectedCode = this.currencyService.code.toUpperCase()
    })

    this.currencyService.setDateRange(this.dateFormGroup.value.dateFrom as Date, this.dateFormGroup.value.dateTo as Date)
    this.currencyService.setFrequency('D1')
    this.currencyService.setCode('usdrub')
    this.currencyService.getCurrencyPairGraph()


    this.dateFormGroup.valueChanges.subscribe(() => {
      this.currencyService.setDateRange(this.dateFormGroup.value.dateFrom as Date, this.dateFormGroup.value.dateTo as Date)
      this.currencyService.getCurrencyPairGraph()
    })

  }

  ngOnInit(): void {
    this.currencyService.currencyPairSubject.subscribe((data) => {
      this.currencyPairDataset = data
      const documentStyle = getComputedStyle(document.documentElement)
      const textColor = documentStyle.getPropertyValue('--text-color')
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

      this.data = {
        labels: [...this.currencyPairDataset.map(value => this.datePipe.transform(new Date(value._id), 'dd/MM/yyyy, hh:mm:ss'))],
        datasets: [
          {
            label: 'Open',
            data: [...this.currencyPairDataset.map(value => value.open)],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4,
          },
          {
            label: 'Close',
            data: [...this.currencyPairDataset.map(value => value.close)],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--red-500'),
            tension: 0.4,
          },
          {
            label: 'Min',
            data: [...this.currencyPairDataset.map(value => value.min)],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--purple-500'),
            tension: 0.4,
          },
          {
            label: 'Max',
            data: [...this.currencyPairDataset.map(value => value.max)],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--green-500'),
            tension: 0.4,
          },
        ],
      }

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              callback: (label: number) => {
                return label
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      }
    })
  }

  ngAfterViewInit(): void {
    const selectElement = document.querySelector('p-selectbutton') as Element

    const clickInSelectElement = fromEvent(selectElement, 'click')

    clickInSelectElement.subscribe(() => {
      this.currencyService.setFrequency(this.selectedFrequency)
      this.currencyService.getCurrencyPairGraph()
    })
  }
}
