export type Entry<K extends string, V> = [K, V];

export interface StockDTO {
  attributes:any
  sorted_attributes:any
  // TODO: remove this
  id: number
  entry: number
  target :number
  target_profit :number
  stop_loss: number
  rank:number
  rr: number
  resistance:number
  support:number
  sentences : string[]
  symbol : string
  sector:string 
  sma_150:number
}