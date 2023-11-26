import { Component, OnInit } from '@angular/core'
import { CurrencyService } from '../../services/currency.service'
import { CurrencyPair } from '../../../models/currency-pair.model'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  currencyPairDataset: CurrencyPair

  data: any
  options: any
  dateFormGroup = new FormGroup({
    dateFrom: new FormControl<Date | null>(null),
    dateTo: new FormControl<Date | null>(null),
  })

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {

    this.currencyService.availableCurrencyPairsSubject.subscribe(console.log)

    this.currencyService.getAvailableCurrencyPairCodes()

    this.currencyService.currencyPairSubject.subscribe((data) => {
      this.currencyPairDataset = data
    })

    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    this.data = {
      labels: [...this.currencyPairDataset.values.map(value => value.timestamp.toDateString())],
      datasets: [
        {
          label: 'Open',
          data: [...this.currencyPairDataset.values.map(value => value.open)],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Close',
          data: [...this.currencyPairDataset.values.map(value => value.close)],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--red-500'),
          tension: 0.4,
        },
        {
          label: 'Min',
          data: [...this.currencyPairDataset.values.map(value => value.min)],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--purple-500'),
          tension: 0.4,
        },
        {
          label: 'Max',
          data: [...this.currencyPairDataset.values.map(value => value.max)],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4,
        },
        //{
        //  label: 'First Dataset',
        //  data: [...this.currencyPairDataset.values.map(value => value.open)],
        //  fill: false,
        //  borderColor: documentStyle.getPropertyValue('--blue-500'),
        //  tension: 0.4,
        //},
        //{
        //  label: 'First Dataset',
        //  data: [...this.currencyPairDataset.values.map(value => value.open)],
        //  fill: false,
        //  borderColor: documentStyle.getPropertyValue('--blue-500'),
        //  tension: 0.4,
        //},
        //{
        //  label: 'First Dataset',
        //  data: [...this.currencyPairDataset.values.map(value => value.close)],
        //  fill: false,
        //  borderColor: documentStyle.getPropertyValue('--blue-500'),
        //  tension: 0.4,
        //},
        //{
        //  label: 'Second Dataset',
        //  data: [...this.currencyPairDataset.values.map(value => value.close)],
        //  fill: false,
        //  borderColor: documentStyle.getPropertyValue('--pink-500'),
        //  tension: 0.4,
        //},
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
  }


}
