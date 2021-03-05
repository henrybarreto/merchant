import { City } from "../types.ts";
import { IProduct } from "./IProduct.ts";

export default class Product implements IProduct {
  public name: string;
  public qualities: string | Set<string>;
  public city: City | Set<City>;

  public constructor(name: string, qualities: Set<string>, cities: Set<City>) {
    this.name = name;
    this.qualities = qualities;
    this.city = cities;
  }
}
