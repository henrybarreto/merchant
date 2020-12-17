import {ProductFromAPI} from './types.d.ts';

function percentOver(from: number, to: number): number {
  return ((1/100*(from/to)));
}
export function orderProductsByPrice(productList: ProductFromAPI[]) {
  return productList.sort((a, b) => {
    return (a.sell_price_min > b.sell_price_min ? 1 : -1);
  });
}
export function orderProductsByQuality(productList: ProductFromAPI[]) {
  return productList.sort((a, b) => {
    return (a.quality > b.quality ? 1 : -1);
  });
}
export function percentOverProduct(productOne: ProductFromAPI, productTwo: ProductFromAPI) {
  return percentOver(productOne.sell_price_min, productTwo.sell_price_min);
}
export function percentOverListOfProducts(product: ProductFromAPI, productList: ProductFromAPI[]) {
  return productList.map((productFromList) => {
    return percentOver(product.sell_price_min, productFromList.sell_price_min);
  });
}
export function freeFee(product: ProductFromAPI) {}
export function premiumFee(product: ProductFromAPI) {}
