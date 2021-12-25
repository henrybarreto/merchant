import { ProductAPI } from "../types.ts";
import { Order } from "../types.ts";

/**
 * Return a pecentage from a number over another
 * @param {number} from
 * @param {number} to
 */
function percentOver(from: number, to: number): number {
  return (1 / 100 * (from / to));
}

/**
 * Return a list of products ordened by price
 * @param {ProductAPI[]} productList
 */
export function orderProductsByPrice(productList: ProductAPI[]) {
  return productList.sort((a, b) => {
    return (a.sell_price_min > b.sell_price_min ? 1 : -1);
  });
}

/**
 * Return a list of products ordened by quality
 * @param {ProductAPI[]} productList
 */
export function orderProductsByQuality(productList: ProductAPI[]) {
  return productList.sort((a, b) => {
    return (a.quality > b.quality ? 1 : -1);
  });
}

/**
 * Return a percentage from a product over another
 * @param {ProductAPI} productOne
 * @param {ProductAPI} productTwo
 */
export function percentOverProduct(
  productOne: ProductAPI,
  productTwo: ProductAPI,
) {
  return percentOver(productOne.sell_price_min, productTwo.sell_price_min);
}

/**
 * Return a percentage from a product over a list of product
 * @param {ProductAPI} product
 * @param {ProductAPI[]} productList
 */
export function percentOverListOfProducts(
  product: ProductAPI,
  productList: ProductAPI[],
) {
  return productList.map((productFromList) => {
    return percentOver(product.sell_price_min, productFromList.sell_price_min);
  });
}

/**
 * Return a ordened list of Products based in a tuple of a Order and a function
 * @param {Order} order
 * @param {[Order, () => Promise<ProductAPI[]>]} pairs
 */
export function orderAnalisys<
  F extends () => Promise<ProductAPI[]>,
  P extends [OrderPair: Order, fn: F],
>(order: Order, ...pairs: P[]): any {
  return pairs.reduce((accPair: P, currentPair: P) => {
    return currentPair[0] == order ? currentPair : accPair;
  })[1]();
}
