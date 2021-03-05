import { IProduct } from "../product/IProduct.ts";
import { IProductAPI } from "../product/IProductAPI.ts";

export default class API {
  private URI_API: string =
    "https://www.albion-online-data.com/api/v2/stats/prices/";
  private bindPayload(...args: any[]) {
    let payload: string = "";
    args.map((arg) => {
      if (arg) {
        payload += arg;
      }
    });

    return payload;
  }
  public async fetchProduct(
    products: IProduct,
  ): Promise<Array<IProductAPI>> {
    try {
      let name = products.name;
      let cities = Array.from(products.city).join(",");
      let qualities = Array.from(products.qualities).join(",");
      const payloadProduct: string = `${this.URI_API}${name}`;
      const payloadLocation: string = `?locations=${cities}`;
      const payloadQualities: string = `&qualities=${qualities}`;
      const payload: string = this.bindPayload(
        payloadProduct,
        payloadLocation,
        payloadQualities,
      );

      const fetchedActionResult: Response = await fetch(payload, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const productsAPIFetched: IProductAPI[] = await fetchedActionResult
        .json();

      return productsAPIFetched;
    } catch (error) {
      console.error(error.message);
      Deno.exit(1);
    }
  }
}
