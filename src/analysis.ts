import {IProduct} from './api.ts';

function percentOver(from: number, to: number): number {
  return ((-100*(from/to)-1));
}
export function orderProductsByPrice(productList: IProduct[]) {
  return productList.sort((a, b) => {
    return (a.sell_price_min > b.sell_price_min ? 1 : -1);
  });
}
export function orderProductsByQuality(productList: IProduct[]) {
  return productList.sort((a, b) => {
    return (a.quality > b.quality ? 1 : -1);
  });
}
export function percentOverProduct(productOne: IProduct, productTwo: IProduct) {
  return percentOver(productOne.sell_price_min, productTwo.sell_price_min);
}
export function percentOverListOfProducts(product: IProduct, productList: IProduct[]) {
  return productList.map((productFromList) => {
    return percentOver(product.sell_price_min, productFromList.sell_price_min);
  });
}
export function freeFee(product: IProduct) {}
export function premiumFee(product: IProduct) {}
