/**
 * Valid product qualities
 */
export type Qualities = 1 | 2 | 3 | 4 | 5;

/**
 *  Valid cities form Albion
 */
export enum Cities {
  Martlock = "martlock",
  Bridgewatch = "bridgewatch",
  Thetford = "thetford",
  Fortsterling = "fortsterling",
  Lymhurst = "lymhurst",
}

/**
 *  Ways to order the output from API
 */
export enum Order {
  Price = "price",
  Quality = "quality",
}

/**
 *  Output interface from API
 */
export interface ProductAPI {
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
  name: string[];
  qualities: string[] | undefined;
  cities: Cities[] | undefined;
  order: Order;
}
