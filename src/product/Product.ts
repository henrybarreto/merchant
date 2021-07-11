import { Cities, Qualities } from "../types.ts";
import { IProduct } from "./IProduct.ts";

export default class Product implements IProduct {
  public name: string;
  public qualities: Set<Qualities>;
  public cities: Set<Cities>;

  public constructor(
    name: string,
    qualities: Set<Qualities>,
    cities: Set<Cities>,
  ) {
    this.name = name;
    this.qualities = qualities;
    this.cities = cities;
  }
}
