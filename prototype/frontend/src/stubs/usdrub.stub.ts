import { CurrencyPair } from '../models/currency-pair.model'

export const STUB_USDRUB: CurrencyPair = {
  code: 'USDRUB',
  fromExchange: 'USD',
  toExchange: 'RUB',
  first_record_date: new Date('1995-12-17T03:24:00'),
  last_record_date: new Date('2021-12-17T03:24:00'),
  import_date: new Date('2023-12-17T03:24:00'),

  values: [
    {
      timestamp: new Date('2018-12-21T03:24:00'),
      open: 90,
      close: 80,
      min: 80,
      max: 100,
    },
    {
      timestamp: new Date('2019-12-22T03:24:00'),
      open: 100,
      close: 100,
      min: 85,
      max: 96,
    },
    {
      timestamp: new Date('2020-12-23T03:24:00'),
      open: 80,
      close: 70,
      min: 75,
      max: 102,
    },
  ],
}