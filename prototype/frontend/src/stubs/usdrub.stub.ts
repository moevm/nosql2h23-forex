import { GraphData } from '../models/contract'

export const STUB_USDRUB: GraphData[] = [
    {
      _id: new Date('2018-12-21T03:24:00').toDateString(),
      open: 90,
      close: 80,
      min: 80,
      max: 100,
    },
    {
      _id: new Date('2019-12-22T03:24:00').toDateString(),
      open: 100,
      close: 100,
      min: 85,
      max: 96,
    },
    {
      _id: new Date('2020-12-23T03:24:00').toDateString(),
      open: 80,
      close: 70,
      min: 75,
      max: 102,
    },
]
