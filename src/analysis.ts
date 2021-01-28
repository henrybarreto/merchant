import { Order, ProductFromAPI } from "./types.ts";

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
 * @param {ProductFromAPI[]} productList 
 */
export function orderProductsByPrice(productList: ProductFromAPI[]) {
  return productList.sort((a, b) => {
    return (a.sell_price_min > b.sell_price_min ? 1 : -1);
  });
}

/**
 * Return a list of products ordened by quality
 * @param {ProductFromAPI[]} productList 
 */
export function orderProductsByQuality(productList: ProductFromAPI[]) {
  return productList.sort((a, b) => {
    return (a.quality > b.quality ? 1 : -1);
  });
}

/**
 * Return a percentage from a product over another
 * @param {ProductFromAPI} productOne 
 * @param {ProductFromAPI} productTwo 
 */
export function percentOverProduct(
  productOne: ProductFromAPI,
  productTwo: ProductFromAPI,
) {
  return percentOver(productOne.sell_price_min, productTwo.sell_price_min);
}

/**
 * Return a percentage from a product over a list of product
 * @param {ProductFromAPI} product 
 * @param {ProductFromAPI[]} productList 
 */
export function percentOverListOfProducts(
  product: ProductFromAPI,
  productList: ProductFromAPI[],
) {
  return productList.map((productFromList) => {
    return percentOver(product.sell_price_min, productFromList.sell_price_min);
  });
}

/**
 * Return a ordened list of Products based in a tuple of a Order and a function
 * @param {Order} order 
 * @param {[Order, () => Promise<ProductFromAPI[]>]} pairs 
 */
export function orderAnalisys<
  F extends () => Promise<ProductFromAPI[]>,
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

export function freeFee(product: ProductFromAPI) {}
export function premiumFee(product: ProductFromAPI) {}
