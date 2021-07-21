import { IProduct } from "../business/product/IProduct.ts";
import { IProductAPI } from "../business/product/IProductAPI.ts";

export default class API {
  private URI_API: string =
    "https://www.albion-online-data.com/api/v2/stats/prices/";

  static createPayload(...args: any[]): string {
    return args.map((arg) => {
      return arg != undefined && arg;
    }).join();
  }

  public async fetchProduct(
    products: IProduct,
  ): Promise<Array<IProductAPI>> {
    try {
      const name = products.name;
      const cities = Array.from(products.cities).join(",");
      const qualities = Array.from(products.qualities).join(",");
      const payloadProduct: string = `${this.URI_API}${name}`;
      const payloadLocation: string = `?locations=${cities}`;
      const payloadQualities: string = `&qualities=${qualities}`;
      const payload: string = API.createPayload(
        payloadProduct,
        payloadLocation,
        payloadQualities,
      );

      return await (await fetch(payload, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }))
        .json();
    } catch (error) {
      console.error(error.message);
      Deno.exit(1);
    }
  }
}
