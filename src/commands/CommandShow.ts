import {
  orderAnalisys,
  orderProductsByPrice,
  orderProductsByQuality,
} from "../analysis.ts";
import API from "../API/API.ts";
import { IProduct } from "../product/IProduct.ts";
import { IProductAPI } from "../product/IProductAPI.ts";
import { Order } from "../types.ts";
import ICommand from "./ICommand.ts";

export default class CommandShow implements ICommand {
  private product: IProduct;
  private productOrder: Order;
  public constructor(product: IProduct, productOrder: Order) {
    this.product = product;
    this.productOrder = productOrder;
  }
  /**
   * Get the a product from the api and return a product orderned by something
   * @param {Product} param0 Product to send to API
   */
  public async execute(): Promise<void> {
    try {
      let api: API = new API();
      console.log("Making the resquest to the server...");
      let items: Array<IProductAPI> = await orderAnalisys(this.productOrder, [
        Order.Price,
        async () => {
          return orderProductsByPrice(await api.fetchProduct(this.product));
        },
      ], [Order.Quality, async () => {
        return orderProductsByQuality(await api.fetchProduct(this.product));
      }]);
      items.map((item: IProductAPI) => {
        console.log(`\r\nItem ${item.item_id}`);
        console.log(`Quality ${item.quality}`);
        console.log(`at ${item.city}`);
        if (item.sell_price_min && item.sell_price_max) {
          console.log(`Minimun sell price: ${item.sell_price_min}`);
          console.log(`Maximun sell price: ${item.sell_price_max}`);
          console.log(`Minimun buy price: ${item.buy_price_min}`);
          console.log(`Maximun buy price: ${item.buy_price_max}`);
        } else {
          console.log("There is not data");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
