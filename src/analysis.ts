import { IProductAPI } from "./product/IProductAPI.ts";
import { Order } from "./types.ts";

/**
 * Return a pecentage from a number over another
 * @param {number} from
 * @param {number} to
 */
function percentOver(from: number, to: number): number {
  return ((1 / 100 * (from / to)));
}

/**
 * Return a list of products ordened by price
 * @param {IProductAPI[]} productList
 */
export function orderProductsByPrice(productList: IProductAPI[]) {
  return productList.sort((a, b) => {
    return (a.sell_price_min > b.sell_price_min ? 1 : -1);
  });
}

/**
 * Return a list of products ordened by quality
 * @param {IProductAPI[]} productList
 */
export function orderProductsByQuality(productList: IProductAPI[]) {
  return productList.sort((a, b) => {
    return (a.quality > b.quality ? 1 : -1);
  });
}

/**
 * Return a percentage from a product over another
 * @param {IProductAPI} productOne
 * @param {IProductAPI} productTwo
 */
export function percentOverProduct(
  productOne: IProductAPI,
  productTwo: IProductAPI,
) {
  return percentOver(productOne.sell_price_min, productTwo.sell_price_min);
}

/**
 * Return a percentage from a product over a list of product
 * @param {IProductAPI} product
 * @param {IProductAPI[]} productList
 */
export function percentOverListOfProducts(
  product: IProductAPI,
  productList: IProductAPI[],
) {
  return productList.map((productFromList) => {
    return percentOver(product.sell_price_min, productFromList.sell_price_min);
  });
}

/**
 * Return a ordened list of Products based in a tuple of a Order and a function
 * @param {Order} order
 * @param {[Order, () => Promise<IProductAPI[]>]} pairs
 */
export function orderAnalisys<
  F extends () => Promise<IProductAPI[]>,
  P extends [OrderPair: Order, fn: F],
>(order: Order, ...pairs: P[]): any {
  const pair = pairs.reduce((accPair: P, currentPair: P) => {
    if (currentPair[0] == order) {
      return currentPair;
    }
    return accPair;
  });

  return pair[1]();
}
