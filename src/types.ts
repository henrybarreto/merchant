/**
 *  Valid cities form Albion
 */
export type Cities =
  | "martlock"
  | "bridgewatch"
  | "thetford"
  | "fortsterling"
  | "lymhurst";

/**
 *  Ways to order the output from API 
 */
export enum Order {
  PRICE = "price",
  QUALITY = "quality",
}

/**
 *  Output interface from API
 */
export interface ProductFromAPI {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

/**
 *  Output interface from Merchant
 */
export interface Product {
  name: string[] | string;
  qualities: string[] | string;
  cities: Cities[] | Cities;
  order: Order;
}
