// ['/'] Database status and additional info
export type DBStatus = {
  // Status, signaling if the Database is running and ready to handle requests.
  DB_is_up: boolean;   // true
  // Status, signaling if Database was created on server startup.
  Generated: boolean;  // false
}

// ['codes/'] List os available currency pairs.
export type Tickers = {
  // An array, containing all available currency pair codes
  available: Code[];   // {"_id": "USDRUB"}
}

export type Periods = {
  available: string[]
}

export type Code = {
  _id: string;         // "USDRUB"
}

// ['show/'] Untouched document from DB.
// ['export/'] returns an ARRAY (!) of such objects.
// Together they constitute the entire DB.
export type CurrencyPair = {
  code: string;               // "USDRUB"
  fromExchange: string;       // "USD"
  toExchange: string;         // "RUB"
  first_record_date: string;  // "2010-01-01T00:00:00"
  last_record_date: string;   // "2010-12-12T00:00:00"
  import_date: string;        // "2023-11-26T00:00:00"
  values: Signal[];
};

// Signal data. Represents a point in time with exchange rate data.
// Is stored in 'values' array in CurencyPair documents.
export type Signal = {
  timestamp: string;    // "2010-01-01T00:00:00"
  open: number;         // 108.1
  close: number;        // 107.2
  min: number;          // 102.0
  max: number;          // 120.9
}

// ['archive/'] Archive data for currency pair.
// !'archive/' returns an array of exactly ONE element of type ArchiveRecord!
export type ArchiveRecord = {
  //A rudimentary field, leftover from aggregation
  _id: number;                    // 0

  code: string;                   // "USDRUB"
  fromExchange: string;           // "USD"
  toExchange: string;             // "RUB"
  import_date: string;            // "2023-11-26T19:34:47.452"
  exchange_rate_records: number; // 129601
  first_record_date: string;      // "2010-01-01T00:00:00"
  last_record_date: string;       // "2010-12-12T00:00:00"
}

// ['point/'] A certain Signal on the graph.
export type SignalPoint = {
  // An array of exactly one element.
  values: Signal[];
}


// ['graph/'] Exchange rates for given period with a certain step (discretization frequency).
// !Bear in mind that 'graph/' returns an array with GraphData objects!
export type GraphData = {
  // Due to aggregation constraints the timestamp is used as _id.
  _id: string;          // "2010-01-01T00:00:00"
  open: number;         // 108.1
  close: number;        // 107.2
  min: number;          // 102.0
  max: number;          // 120.9
}

// ['import/'] returns a status of database import operation
export type ImportStatus = {
  db_imported: boolean;   // True
  errors: string;         // "" (empty string) if imported successfully
}
