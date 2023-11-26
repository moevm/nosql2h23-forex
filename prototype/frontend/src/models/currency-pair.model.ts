export type CurrencyPair = {
  code: string; // USDRUB
  fromExchange: string; // USD
  toExchange: string; // RUB
  first_record_date: Date;
  last_record_date: Date;
  import_date: Date;
  values: ExchangeMoment[];
};

export type ExchangeMoment = {
  timestamp: Date;
  open: number;
  close: number;
  min: number;
  max: number;
};
