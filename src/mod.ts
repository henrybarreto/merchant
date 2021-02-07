import Denomander from "https://deno.land/x/denomander@0.8.0/mod.ts";
import {
  orderAnalisys,
  orderProductsByPrice,
  orderProductsByQuality,
} from "../src/analysis.ts";
import { fetchProducts } from "../src/api.ts";
import { Cities, Order, Product } from "./types.ts";
import { showProducts } from "./interface.ts";
import { ProductValidate } from "./validator.ts";

/**
 * Get the a product from the api and return a product orderned by something
 * @param {Product} param0 Product to send to API
 */
export async function getProduct({
  name,
  qualities = ['1','2','3','4','5'],
  cities = [Cities.Thetford, Cities.Martlock, Cities.Lymhurst, Cities.Fortsterling, Cities.Bridgewatch],
  order = Order.Price,
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

  return orderAnalisys(order, [Order.Price, async () => {
    return orderProductsByPrice(await fetchProducts(product));
  }], [Order.Quality, async () => {
    return orderProductsByQuality(await fetchProducts(product));
  }]);
}

/**   
 * Main function of the program
 * @param program 
 */
export async function main(program: Denomander) {
  try {
    const { name, qualities, cities, order } = program;

    const productValidated: Product = new ProductValidate({
      name,
      qualities, 
      cities, 
      order
    });
    showProducts(productValidated);
  } catch(error) {
    console.error(error);
  }
}
