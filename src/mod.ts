import Denomander from "https://deno.land/x/denomander@0.8.0/mod.ts";
import {
  orderAnalisys,
  orderProductsByPrice,
  orderProductsByQuality,
} from "../src/analysis.ts";
import { fetchProducts } from "../src/api.ts";
import { Order, Product } from "./types.ts";
import { showProducts } from "./interface.ts";

/**
 * Get the a product from the api and return a product orderned by something
 * @param {Product} param0 Product to send to API
 */
export async function getProduct({
  name,
  qualities = "1,2,3,4,5",
  cities = ["martlock", "thetford", "lymhurst", "fortsterling", "bridgewatch"],
  order = Order.PRICE,
}: Product) {
  if (typeof name == "boolean") {
    throw new Error("A item's name is required!");
  }

  const product: Product = {
    name,
    qualities,
    cities,
    order,
  };

  return orderAnalisys(order, [Order.PRICE, async () => {
    return orderProductsByPrice(await fetchProducts(product));
  }], [Order.QUALITY, async () => {
    return orderProductsByQuality(await fetchProducts(product));
  }]);
}

/**
 * Main function of the program
 * @param program 
 */
export function main(program: Denomander) {
  const { name, qualities, cities, order } = program;
  showProducts({
    name,
    qualities,
    cities,
    order,
  });
}
