import { City, Qualities } from "../types.ts";
import { IProduct } from "./IProduct.ts";

export default class Product implements IProduct {
  public name: string;
  public qualities: Set<Qualities>;
  public city: Set<City>;

  public constructor(name: string, qualities: Set<Qualities>, cities: Set<City>) {
    this.name = name;
    this.qualities = qualities;
    this.city = cities;
  }
}
