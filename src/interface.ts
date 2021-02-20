import { getProduct } from "./mod.ts";
import { Product, ProductFromAPI } from "./types.ts";

class Interface { // Fix this name
  static async showProducts(product: Product): Promise<void> {
    try {
      console.log("Making the resquest to the server...");
      const result: ProductFromAPI[] = await getProduct(product);
      console.clear();
      console.log(`Items ordened by ${product.order}`);
      result?.map((item: ProductFromAPI) => {
        console.log(`\r\nItem ${item!.item_id}`);
        console.log(`Quality ${item.quality}`);
        console.log(`at ${item.city}`);
        if( item.sell_price_min && item.sell_price_max ) {
            console.log(`Minimun sell price: ${item.sell_price_min}`);
            console.log(`Maximun sell price: ${item.sell_price_max}`);
            console.log(`Minimun buy price: ${item.buy_price_min}`);
            console.log(`Maximun buy price: ${item.buy_price_max}`);
          } else {
            console.log("There is not data")
          }
      });

      Deno.exit(0);
    } catch (error) {
      console.error(error.message);
      Deno.exit(1);
    }
  }
}

export default Interface;