export type Order =
  'price' |
  'quality';


export type Cities = 
'martlock' | 
'bridgewatch' | 
'thetford' |
'fortsterling' |
'lymhurst';

export interface ProductFromAPI {
  item_id: string,
  city: string,
  quality: number,
  sell_price_min: number,
  sell_price_min_date: string,
  sell_price_max: number,
  sell_price_max_date: string,
  buy_price_min: number,
  buy_price_min_date: string,
  buy_price_max: number,
  buy_price_max_date: string
}

export interface Product {
  name: string[] | string,
  qualities: string[] | string,
  cities: Cities[] | Cities,
  order: Order
}