import {
  orderAnalisys,
  orderProductsByPrice,
  orderProductsByQuality,
} from "../utils/analysis.ts";
import { Order, Product, ProductAPI } from "../types.ts";
import { fetchProduct } from "../network/network.ts";

// Fetch and show the data about a product.
export async function show(product: Product, order: Order) {
  console.info("Making the resquest to the server...");

  const products: Array<ProductAPI> = await orderAnalisys(order, [
    Order.Price,
    async () => orderProductsByPrice(await fetchProduct(product)),
  ], [
    Order.Quality,
    async () => orderProductsByQuality(await fetchProduct(product)),
  ]);

  products.map((product: ProductAPI) => {
    console.info(`\r\nItem ${product.item_id}`);
    console.info(`Quality ${product.quality}`);
    console.info(`at ${product.city}`);
    if (product.sell_price_min && product.sell_price_max) {
      console.info(`Minimun sell price: ${product.sell_price_min}`);
      console.info(`Maximun sell price: ${product.sell_price_max}`);
      console.info(`Minimun buy price: ${product.buy_price_min}`);
      console.info(`Maximun buy price: ${product.buy_price_max}`);
    } else {
      console.info("There is not data");
    }
  });
}
