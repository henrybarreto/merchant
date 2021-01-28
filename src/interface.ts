import { getProduct } from "./mod.ts";
import { Product, ProductFromAPI } from "./types.ts";

export async function showProducts(product: Product) {
  try {
    console.log("Making the resquest to the server...");
    const result: ProductFromAPI[] = await getProduct(product);
    console.clear();
    console.log(`Items ordened by ${product.order}`);
    return result?.map((item: ProductFromAPI) => {
      console.log(`\r\nItem ${item!.item_id}`);
      console.log(`Quality ${item.quality}`);
      console.log(`at ${item.city}`);
      console.log(`Minimun sell price: ${item.sell_price_min}`);
      console.log(`Maximun sell price: ${item.sell_price_max}`);
      console.log(`Minimun buy price: ${item.buy_price_min}`);
      console.log(`Maximun buy price: ${item.buy_price_max}`);
    });
  } catch (error) {
    console.error(error.message);
    Deno.exit(1);
  }
}
