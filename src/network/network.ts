import { Product, ProductAPI } from "../types.ts";

/**
 * URI to get Albion's data.
 */
const API_URI = "https://www.albion-online-data.com/api/v2/stats/prices/";

/**
 * Fetch for a product's price in the Albion Online Data.
 * @param {Product} product
 * @returns ProductAPI
 */
export async function fetchProduct(
  product: Product,
): Promise<Array<ProductAPI>> {
  const validPayload = (...args: any[]): string => {
    return args.map((arg) => arg != undefined && arg).join();
  };

  const name = product.name;
  const cities = Array.from(product.cities).join(",");
  const qualities = Array.from(product.qualities).join(",");

  const payloadProduct: string = `${API_URI}${name}`;
  const payloadLocation: string = `?locations=${cities}`;
  const payloadQualities: string = `&qualities=${qualities}`;
  const payload: string = validPayload(
    payloadProduct,
    payloadLocation,
    payloadQualities,
  );

  return await (await fetch(payload, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })).json();
}
