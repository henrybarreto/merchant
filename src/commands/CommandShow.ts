import API from "../API/API.ts";
import { IProduct } from "../product/Product.ts";
import { IProductAPI } from "../product/ProductAPI.ts";
import ICommand from "./ICommand.ts";

export default class CommandShow implements ICommand {
  private product: IProduct;
  public constructor(product: IProduct) {
    this.product = product;
  }
  /**
   * Get the a product from the api and return a product orderned by something
   * @param {Product} param0 Product to send to API
   */
  /*private async getProduct({
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
    const fetchProduct: FetchProduct = new FetchProduct();
  
    return orderAnalisys(order, [Order.Price, async () => {
      return orderProductsByPrice(await fetchProduct.fetchProductAPI(product));
    }], [Order.Quality, async () => {
      return orderProductsByQuality(await fetchProduct.fetchProductAPI(product));
    }]);
  }*/
  public async execute(): Promise<void> {
    try {
      let api: API = new API();
      console.log("Making the resquest to the server...");
      let items: Array<IProductAPI> = await api.fetchProduct(this.product);
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
    /*try {
      console.log("Making the resquest to the server...");
      const result: IProductAPI[] = await getProduct(product);
      console.clear();
      console.log(`Items ordened by ${product.order}`);
      result?.map((item: IProductAPI) => {
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
    }*/
  }
}
